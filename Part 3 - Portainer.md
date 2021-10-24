# Portainer

- So with a few commands we were able to run a mysql container and be able to clean up everything behind us. What if we had multiple containers to manage? It would make it a bit tedious to clean up after multiple containers, remove images or maybe finding which container your want to stop. We can solve this issue by making use of a tool called portainer.

https://docs.portainer.io/v/ce-2.9/start/install/server/docker/linux

- Portainer is tool that will help us manage anything related to the capabilities of docker such as:
  - Managing images
  - creation and deletion of containers 
  - Managing networks 
  - creating volumes. 
- Lets create our portainer container. 

```bash
# First we shall create a volume where portainer will store its files, A volume is a permanent storage directory for the container, if the container is ever deleted and created again, if the volume has not been deleted it can reaccess those files again.
docker volume create portainer_data

# We shall now create the portainer container, For portainer to run as intended we need to mount our docker socket as a volume. Remember that in linux everything is a file and therefore, everything can be mounted to docker, even a socket. 
docker run -d -p 8000:8000 -p 9000:9000 --name=portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce
```

- If you are using https://labs.play-with-docker.com/. Click on Open Port next to the IP and expose 9000, for the others lets open our browser and write http://localhost:9000

- Lets take a look around portainer.
  - Show in containers
  - Images
  - Networks

- Let create an image from portainer by clicking on add container. 
- Create the same mysql:8 container but purposely forget environment variable.

  - Go back and see that the container has stopped, access the container and go on the logs and point out the issue.

  - Edit the container and add in `MYSQL_ROOT_PASSWORD=password` and run the container again. We can see that now it is up and running :)

# Visual Studio code and creating a docker file.

The next step is for us to create our own docker image instead of pulling from dockerhub.

Docker builds images automatically by reading the instructions from a `Dockerfile` -- a text file that contains all commands, in order, needed to build a given image.

The image defined by your `Dockerfile` should generate containers that are easily built and destroyed without requiring any extra steps afterwards like (Mounting an important file, forgetting to place your application to run, file permissions.. etc)

A Docker image consists of read-only layers each of which represents a Dockerfile instruction. The layers are stacked and each one is a delta of the changes from the previous layer

Each instruction creates one layer:

- `FROM` creates a layer from the `ubuntu:18.04` Docker image.
- `COPY` adds files from your Docker client’s current directory.
- `RUN` builds your application with `make`.
- `CMD` specifies what command to run within the container.

## Looking at our angular project & creating a dockerfile.

Lets use the project docker-microservice-fe. This is an angular application that need nodejs and @angular/cli package installed to launch this application. 

```dockerfile
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
```



```bash
# Lets build the image with a tag {docker-microservice-fe:1.0}
docker build . -t docker-microservice-fe:1.0

# Lets now run the container with the image that we have created
# docker run {--name container name} {-port binding host:container} -d {running container as a deamon} {image name} 
docker run --name docker-microservice-fe -p 4200:4200 -d docker-microservice-fe:1.0 
```



- We managed to create our container and if we look at portainer, `http://localhost:9000` . We can see our container `docker-microservice-fe` with our created custom image, when it was created and what ports it has published.

![image-20211018190756024](C:\Users\agius\AppData\Roaming\Typora\typora-user-images\image-20211018190756024.png)

- Now what if we want to add something else to our project? How currently the docker file is setup, it copies our code unto the container so when we do any changes we have to delete the container, update the image and create another one.
- Instead what we can do is mount our code as a volume so that when we perform any changes, those changes are also applied to the docker container as we are creating a direct link between our host machine and the container.
  1) Lets drop our container
  2) Lets go back to our dockerfile and remove that redundant the copy command and the run commands.
  3) Lets also change our CMD command

```dockerfile
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
CMD bash -c " npm install && npm install -g @angular/cli > /dev/null && ng serve --proxy-config proxy.conf.json"
```

3. We now altered our dockerfile to create a development image where we can use any angular application and mount it to our container. (This does not work on windows, there is a setting you must enable that lets you to use drives)

```bash
# Lets create a new image called angular-development:1.0
docker build -f Dockerfile.angular.develop -t angular-development:1.0 .

# Lets now update our previous command to build a container with our new updated image and mount our code.
docker run -v C:/Users/agius/Desktop/Docker-Microservice/docker-microservice-course/microservice-docker-fe/angular-app-student-fe/:/app -p 4200:4200 -d angular-development:1.0
```

4. If we now edit any file, it should show that we have successfully mounted our code :) 
5. However, if we try to run anything from our application, it needs to connect to our backend server which we still need to deploy.
6. Lets now create a docker-compose file to load our stack! 

7. If you are using https://labs.play-with-docker.com/. You need to upload the directory I have given you so that we would deploy a fully working stack.

```bash
scp -r C:\Users\agius\Desktop\Docker-Microservice\docker-microservice-course\microservice-docker-fe root@ip172-18-0-16-c5q6effnjsv000ak4bgg@direct.labs.play-with-docker.com:/root/
```



