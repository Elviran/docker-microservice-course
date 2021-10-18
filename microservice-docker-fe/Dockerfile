# FROM  creates a layer from the `node:14` Docker image. This image shall be pulled from dockerhub. Just like when we did `docker pull mysql:8` 
# FROM {image-name}:{tag}
FROM node:lts

# Create app directory
WORKDIR /app

# Application exposes port 4200
EXPOSE 4200

# Our command for our container to run. Without this command, the container will be created with our newly created image but it shall instantly exit.
# With the use of ENTRYPOINT or CMD, the container can continue living while that process is still active. Once the process exits (either the application crashed, or the service has stopped) The container automatically exits.
# The command below translates to bash {-c command} "{`ng serve` will start our angular application}" {--host to 0.0.0.0 as if this is left as localhost, we would not be able to access http://localhost:4200 on our browser as it won't bind correctly} {--port 4200}
CMD bash -c "npm install -g @angular/cli && npm install && ng serve --host 0.0.0.0 --port 4200"