# Portainer

- So with a few commands we were able to run a mysql container and be able to clean up everything behind us. What if we had multiple containers to manage? It would make it a bit tedious to clean up after mulitple containers, remove images or maybe finding which container your want to stop. We can solve this issue by making use of a tool called portainer.

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



- Lets take a look around portainer. Lets open our browser and write http://localhost:9000
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

```
# Create mysql docker file

```



- Create Directory ./mysql-scripts and create script.sql

```mysql
CREATE TABLE school;

CREATE TABLE school.student (
     ID int NOT NULL AUTO_INCREMENT,
     name varchar(255) NOT NULL,
     surname varchar(255) NOT NULL,
     age int,
     address varchar(255),
     scholastic_year int(4),
     PRIMARY KEY (ID)
);

Insert into school.student (ID, name, surname, age, address, scholastic_year)
VALUES (1,'iris','curmi',27,'in the land of the gozitans', 2021)
```



```bash
 docker build . -t docker-microservices-fe
 
 docker run -dp 3000:3000 docker-microservices-fe
```

