# Creating a docker-compose file to load our entire stack

- Docker compose is a tool for defining and running multi-container applications. With docker-compose, we create a layout for our stack by configuring services and then with a single command, we can start all services defined into containers. Think as docker-compose as a wrapper on docker.

1. Lets start by creating docker-compose file. `docker-compose.yml`

   ​	- MYSQL

   ​	- BACKEND

   ​	- FRONTEND

```yaml
version: "3.3"
services:
  #MYSQL Container
  mysql:
    image: mysql:8
    container_name: docker-mysql
    volumes:
    - ./sql-init/:/docker-entrypoint-initdb.d/
    restart: always
    expose:
    - 3306
    environment:
      MYSQL_ROOT_PASSWORD: abcdefgh
    command: --default-authentication-plugin=mysql_native_password
  #Backend Container
  backend:
    image: maven:3.6.3-jdk-11
    container_name: docker-microservice-be
    working_dir: /usr/app/
    depends_on:
      - mysql
    volumes:
        - ../microservice-docker-be/:/usr/app
    expose: 
      - 8080
    ports:
      - 8080:8080
    command:  mvn spring-boot:run -D spring-boot.run.profiles=docker
  #Frontend Container
  frontend:
    image: node:lts
    container_name: docker-microservice-fe
    expose:
      - 4200
    ports:
      - 4200:4200
    working_dir: /app
    depends_on:
      - backend
    volumes:
        - ../microservice-docker-fe/angular-app-student-fe/:/app/
    command: bash -c "npm install && npm install -g @angular/cli > /dev/null && ng serve --host 0.0.0.0 --port 4200 "
```

2) Lets start with some docker-compose commands

```bash
# Initializes images, cvolumes, networks and containers.
docker-compose up --build

#Check containers in stack
docker-compose ps

         Name                       Command               State                    Ports
----------------------------------------------------------------------------------------------------------
docker-microservice-be   /usr/local/bin/mvn-entrypo ...   Up      8080/tcp
docker-microservice-fe   docker-entrypoint.sh bash  ...   Up      0.0.0.0:4200->4200/tcp,:::4200->4200/tcp
docker-mysql             docker-entrypoint.sh --def ...   Up      3306/tcp, 33060/tcp

# Kill all containers in stack.
docker-compose kill

#Stops containers and removes containers, networks, volumes, and images created by up.
docker-compose down

#launch only one container
docker-compose up mysql

#view logs in stack
docker-compose logs

#Lets down everything again and move on to the next step.
docker-compose down

```

3. There is also a way that instead of editting stuff directly from the docker-compose file, we can create a file `.env` to store environment variables  and store the port, code directory and command so that as much as possible we do not mess anything with the compose file.

```properties
#mysql
MYSQL_PASSWORD=abcdefgh

# backend application environment file
BACKEND_DIRECTORY=..\microservice-docker-be
BACKEND_PORT=8080
BACKEND_COMMAND=mvn spring-boot:run -D spring-boot.run.profiles=docker

#frontend application environment file
UI_DIRECTORY=../microservice-docker-fe/angular-app-student-fe/
UI_PORT=4200
UI_COMMAND=bash -c 'npm install && npm install -g @angular/cli > /dev/null && ng serve --host 0.0.0.0 --port ${UI_PORT}'

```

4. Lets Alter the docker-compose.yml file now to use our new created environment variables.

```yaml
version: "3.3"
networks:
  school-application-stack:
services:
  #MYSQL Container
  mysql:
    image: mysql:8
    container_name: docker-mysql
    volumes:
      - ./sql-init/:/docker-entrypoint-initdb.d/
    restart: always
    networks: 
      - school-application-stack
    expose:
      - 3306
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_PASSWORD}
    command: --default-authentication-plugin=mysql_native_password
  #Backend Container
  backend:
    image: maven:3.6.3-jdk-11
    container_name: docker-microservice-be
    working_dir: /usr/app/
    networks: 
      - school-application-stack
    volumes:
      - ${BACKEND_DIRECTOR}:/usr/app
    expose: 
      - ${BACKEND_PORT}
    command:  ${BACKEND_COMMAND}
  #Frontend Container
  frontend:
    image: node:lts
    container_name: docker-microservice-fe
    working_dir: /app 
    networks: 
      - school-application-stack
    expose:
      - ${CONTAINERPORT}
    ports:
      - ${HOSTUIPORT}:${CONTAINERPORT}
    volumes:
        - ${UIDIRECTORY}:/app/
    command: ${UICOMMAND}
```

```bash
# Lets use some docker-compose commands to verify that our docker-compose file has everything working.
# Config will show that our environment variables have been replaced with the actual values inside the docker-compose. If the environment variable is not initialized correctly, docker-compose will warn you or else using config you can see any missing information.
docker-compose -f .\docker-compose.v2.yml config

docker-compose -f .\docker-compose.v2.yml up --build
```

Any Questions please do not hesitate to message me and we can go through anything together! 

Thank you for who ever is reading this and kind regards,

Irisann Curmi
