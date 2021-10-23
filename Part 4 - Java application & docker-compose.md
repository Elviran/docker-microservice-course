# Creating a docker-compose file to load our entire stack

```yaml
version: "3.9"
services:
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
  frontend:
    image: node:lts
    container_name: docker-microservice-fe
    expose:
      - 4200
    ports:
      - 4200:4200
    working_dir: /app
    volumes:
        - ../microservice-docker-fe/angular-app-student-fe/:/app/
    command: bash -c "npm install && npm install -g @angular/cli > /dev/null && ng serve --host 0.0.0.0 --port 4200 "
  backend:
    image: maven:3.6.3-jdk-11
    container_name: docker-microservice-be
    working_dir: /usr/app/
    volumes:
        - ../microservice-docker-be/:/usr/app
    expose: 
      - 8080
    command: mvn spring-boot:run

```

2. Create directory sql-init and create file student-db.sql

```bash
CREATE DATABASE school;

CREATE TABLE school.student (
     ID int NOT NULL AUTO_INCREMENT,
     `name` varchar(255) NOT NULL,
     surname varchar(255) NOT NULL,
     age int,
     `address` varchar(255),
     scholastic_year int(4),
     PRIMARY KEY (ID)
);

INSERT INTO school.student (ID, name, surname, age, address, scholastic_year)
VALUES (1, 'Irisann', 'Curmi', 27, 'Santa Venera', 2020);

INSERT into school.student (ID, name, surname, age, address, scholastic_year)
VALUES (2, 'Axel', 'Curmi', 24, 'Hamrun', 2019);

```



    ```bash
    docker-compose up --build
    ```

TODO:

- Add .env file
- Add properties to connect with db in backend app and in frontend app
- Add restart setting
- Create Network and demonstrate how containers communicate with each other inside but not those containers outside the network. 
- network mode : host . Maps everything to use host network instead. 
- Show host setting (remember to change configurations)

