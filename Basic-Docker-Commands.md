### Docker Commands for Container and Image Information

List running containers:

```
docker ps
```

`docker ps -a` – lists both running containers and ones that have stopped

List the logs from a running container:

```
docker logs [CONTAINER]
```

List low-level information on Docker objects:

```
docker inspect [OBJECT_NAME/ID]
```

List real-time events from a container:

```
docker events [CONTAINER]
```

Show port (or specific) mapping for a container:

```
docker port [CONTAINER]
```

Show running processes in a container:

```
docker top [CONTAINER]
```

Show live resource usage statistics of containers:

```
docker stats [CONTAINER]
```

Show changes to files (or directories) on a filesystem:

```
docker diff [CONTAINER]
```

List all images that are locally stored with the docker engine:

```
docke image ls
```

Show the history of an image:

```
docker history [IMAGE]
```





### Docker Image Commands

Below you fill find all the necessary commands for working with [Docker images](https://phoenixnap.com/kb/create-docker-images-with-dockerfile).

Create an image from a Dockerfile:

```
docker build [URL]
```

`docker build -t` – builds an image from a Dockerfile in the current directory and tags the image

Pull an image from a registry:

```
docker pull [IMAGE]
```

Push an image to a registry:

```
docker push [IMAGE]
```

Create an image from a tarball:

```
docker import [URL/FILE]
```

Create an image from a container:

```
docker commit [CONTAINER] [NEW_IMAGE_NAME]
```

Remove an image:

```
docker rmi [IMAGE]
```

Load an image from a tar archive or stdin:

```
docker load [TAR_FILE/STDIN_FILE]
```

Save an image to a tar archive, streamed to STDOUT with all parent layers, tags, and versions:

```
docker save [IMAGE] > [TAR_FILE]
```



### Starting and Stopping Containers

The following commands show you how to [start and stop](https://phoenixnap.com/kb/how-to-list-start-stop-docker-containers) processes in a particular container.

Start a container:

```
docker start [CONTAINER_NAME/CONTAINER_ID]
```

Stop a running container:

```
docker stop [CONTAINER_NAME/CONTAINER_ID]
```

Stop a running container and start it up again:

```
docker restart [CONTAINER_NAME/CONTAINER_ID]
```

Pause processes in a running container:

```
docker pause [CONTAINER_NAME/CONTAINER_ID]
```

Unpause processes in a running container:

```
docker unpause [CONTAINER_NAME/CONTAINER_ID]
```

Block a container until others stop (after which it prints their exit codes):

```
docker wait [CONTAINER_NAME/CONTAINER_ID]
```

Kill a container by sending a SIGKILL to a running container:

```
docker kill [CONTAINER_NAME/CONTAINER_ID]
```

Attach local standard input, output, and error streams to a running container:

```
docker attach [CONTAINER_NAME/CONTAINER_ID]
```

List networks:

```
docker network ls
```

Remove one or more networks:

```
docker network rm [NETWORK]
```

Show information on one or more networks:

```
docker network inspect [NETWORK]
```

Connects a container to a network:

```
docker network connect [NETWORK] [CONTAINER]
```

Disconnect a container from a network:

```
docker network disconnect [NETWORK] [CONTAINER]
```

```
systemctl start/stop docker     #start/stop docker service
systemctl enable docker         #enable docker running when OS start
docker pull                     #pull Docker image
docker ps                       #list all running Containers 
docker ps -a                   #list all Containers
docker start/stop CONTAINER ID #start/stop Container            
docker rm CONTAINER ID         #delete Container by ID
docker kill CONTAINER ID       #shut down Container
docker images                   #list all images have been downloaded
```