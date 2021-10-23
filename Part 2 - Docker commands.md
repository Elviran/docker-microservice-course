# Introduction to basic docker commands

https://phoenixnap.com/kb/list-of-docker-commands-cheat-sheet

If you have not been able to create a vm or install docker on windows. You can use https://labs.play-with-docker.com/ by creating an account with dockerhub.

## Docker Help

If we write docker help, it will list all the commands that we can execute with docker. Lets for now start with the simple ones 

```
docker help
```

## Docker ps

List running containers:

```
docker ps
```

`docker ps -a` – lists both running containers and ones that have stopped

## Docker ls

List all created images:

```
docker images
```

So far there is nothing to show since we havent created any container yet. So lets create a docker container from a pre-created image that is hosted on docker hub.

## Docker pull images from docker hub

Dockerhub is the public repository that is being offered by docker. There a lot of organizations such as mysql, java, nginx, ubuntu and others that publish their images that are open for others to pull and make use of. 

Go to https://hub.docker.com/_/mysql and copy the command to pull this image.

```
docker pull mysql
```

if we run docker ls, we can now see that have a mysql image pulled to our system.

```bash
docker ls
```



If we go back to docker-hub we can also see what mysql version we can pull, so if we add image:tag, we can pull that specific image.

``` 
docker pull mysql:8
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
6. If we run `docker port [container_id]` . We can see the port that the container is exposing along with our port that we are binding to the container.
7. Lets open Dbeaver, this is a client which will enable us to connect to a mysql server. In this case, we shall be connecting to our docker container through the port that we exposed.
8. (Demonstrate how to connect to dbeaver, after try accessing the container )
9. Lets create a student database so that we can later see it through the container.

```mysql
CREATE DATABASE student;

USE student;
```

10. Lets try to access our mysql container now by using. Lets see the table we had created in dbeaver.

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

11. Lets run another mysql container but now with an image that we have not pulled. 

 ```bash
 docker run --name docker-mysql-5.7 -p3307:3306 -e MYSQL_ROOT_PASSWORD=password -it mysql:5.7
 ```

12. The command will still work but instead of instantly creating the container, it shall first pull the image from docker hub and then create the container.
13. Lets kill this container since we are running it in interactive mode my pressing ctrl + c together multiple times or just closing the terminal.

14. If we perform `docker ps`, we should see that we should only have one container running. Now if we use `docker ps -a` it shall give us a list of all the containers that we have. 

15. Lets now try to delete our running container.

```
docker rm [container_id]
```

16. Before removing any running containers, A container must be stopped and then you can remove it

```
docker stop [container_id] 
docker rm [container_id]
```

17. Lets now delete the mysql image as well so we remove any residuals. An image can only be deleted if there are no containers using it.

```
docker rmi [image name]
```





```
docker rm $(docker ps -a -q -f status=exited)
```

