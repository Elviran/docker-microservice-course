# Introduction to basic docker commands

https://phoenixnap.com/kb/list-of-docker-commands-cheat-sheet

https://dockerlabs.collabnix.com/docker/cheatsheet/

If you have not been able to create a vm or install docker on windows. You can use https://labs.play-with-docker.com/ by creating an account with dockerhub.

## Docker 

```bash
# If we write docker help, it will list all the commands that we can execute with docker. Lets for now start with the simple ones 
docker help
# List currently running containers:
docker ps
# List all created images:
docker image ls
```

## Docker pull images from docker hub

Dockerhub is the public repository that is being offered by docker. There a lot of organizations such as mysql, java, nginx, ubuntu and others that publish their images that are open for others to pull and make use of. 

Go to https://hub.docker.com/_/mysql and copy the command to pull this image.

```bash
# When we dont give a tag to the image, we will always download their latest.
docker pull mysql

#we can now see that have a mysql image pulled to our system.
docker image ls
```

If we go back to docker-hub we can also see what mysql version we can pull, so if we add image:tag, we can pull that specific image.

``` bash
docker pull mysql:8
```

```bash
# List all images that are locally stored with the docker engine:
docker image ls

# Show the history of an image:
docker history mysql:8
```

 ## Run docker image using -it and -d

After pulling the mysql image, it is now time to create our mysql container.

1) docker run is used to create a container from the chosen image in this case, we shall be using mysql.
2) --name shall give our container a custom name to build it with.
3) -p means ports, if shall be binding our port 3306 to the port that will be exposed through the docker container.
4)  -e is an environment variable that we can override by writing the environment variable name correctly and then assign the value.
5) -d means we shall be running this container in the background, however we can also run the container in interactive mode. I shall be demonstrating this as well after we run this command.

```
docker run --name docker-mysql -p3306:3306 -e MYSQL_ROOT_PASSWORD=password -d mysql:8
```

5. If we do `docker ps  ` , we can see that we have a running mysql container.
6. Lets explore the container by using some docker commands!

```bash
# get list of active containers
docker ps -a 

# List the logs from a running container:
docker logs [CONTAINER]

# List low-level information on Docker objects:
docker inspect [OBJECT_NAME/ID]

# Show port (or specific) mapping for a container:
docker port [CONTAINER]

#Show running processes in a container:
docker top [CONTAINER]

# Show live resource usage statistics of containers:
docker stats [CONTAINER]

# Show changes to files (or directories) on a filesystem:
docker diff [CONTAINER]
```

7. Lets try to access our mysql container by using docker exec

```bash
docker exec -it [container_id/container_name] bash

# Access mysqld, p = password
mysqld -u root -p 

mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
```

8. Lets open Dbeaver, this is a client which will enable us to connect to a mysql server. In this case, we shall be connecting to our docker container through the port that we exposed.

9. (Demonstrate how to connect to dbeaver, after try accessing the container )
10. Lets create a student database so that we can later see it through the container.

```mysql
CREATE DATABASE student;

USE student;
```

10. Access the container again:

```bash
docker exec -it [container_id/container_name] bash

# Access mysqld, p = password
mysqld -u root -p 

mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| student            |
| sys                |
+--------------------+


```

11. Lets manipulate the container by using these docker commands:

```bash
# Stop a running container:
docker stop [CONTAINER_NAME/CONTAINER_ID]

# Start a container:
docker start [CONTAINER_NAME/CONTAINER_ID]

# Stop a running container and start it up again:
docker restart [CONTAINER_NAME/CONTAINER_ID]

# Pause processes in a running container:
docker pause [CONTAINER_NAME/CONTAINER_ID]

# Unpause processes in a running container:
docker unpause [CONTAINER_NAME/CONTAINER_ID]

# Block a container until others stop (after which it prints their exit codes):
docker wait [CONTAINER_NAME/CONTAINER_ID]

# Kill a container by sending a SIGKILL to a running container:
docker kill [CONTAINER_NAME/CONTAINER_ID]

# Attach local standard input, output, and error streams to a running container:
docker attach [CONTAINER_NAME/CONTAINER_ID]

```

12. Lets run another mysql container but now with an image that we have not pulled. 

 ```bash
 docker run --name docker-mysql-5.7 -p3307:3306 -e MYSQL_ROOT_PASSWORD=password -d mysql:5.7
 ```

13. The command will still work but instead of instantly creating the container, it shall first pull the image from docker hub and then create the container.

14. Lets now see how containers and images are cleaned up from our system.

```bash
# Lets now try to delete our running container.
docker rm [container_id]

# Before removing any running conainers, a container must be stopped beforehand.
docker stop [container_id] 
docker rm [container_id]

#Lets now delete the mysql image as well so we remove any residuals. An image can only be deleted if there are no containers using it.
docker rmi [image name]

#If there are any other containers which maybe exited we can use this command to clear them all from our system
docker rm $(docker ps -a -q -f status=exited)

# We can also use
docker system prune
```

