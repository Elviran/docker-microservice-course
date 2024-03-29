# FROM  creates a layer from the `node:14` Docker image. This image shall be pulled from dockerhub. Just like when we did `docker pull mysql:8` 
# FROM {image-name}:{tag}
FROM node:lts

# Create app directory
WORKDIR /app

# Copy application dependencies, What copy does is it takes the chosen directory and copies it to the container.
# COPY {directory_from_host} TO {directory_to_container}
COPY ./frontend-app /app

# Application exposes port 4200
EXPOSE 4200

# Since our application is created with angular, we shall be using nodejs to run `npm install` which will build our files and create the necessary modules to run.
# After npm installed our application, we shall also install angular/cli, @angular/cli is wrapper to npm to ease in component creation and also runnables.
# The reason why I did this as a one line is because each command FROM, WORKDIR, COPY, RUN creates a new layer. A new layer is like a temporary container that executes
# the command specified and then kills itself for the next step to take on from there and repeat the process. Think of it as building blocks. One block ontop of each other.
RUN npm install -g @angular/cli && npm install


# Our command for our container to run. Without this command, the container will be created with our newly created image but it shall instantly exit.
# With the use of ENTRYPOINT or CMD, the container can continue living while that process is still active. Once the process exits
# (either the application crashed, or the service has stopped) The container automatically exits.
# The command below translates to bash {-c command} "{`ng serve` will start our angular application}"
# {--host to 0.0.0.0 as if this is left as localhost, we would not be able to access http://localhost:4200 on our browser as it won't bind correctly} {--port 4200}
CMD bash -c "ng serve --host 0.0.0.0 --port 4200"