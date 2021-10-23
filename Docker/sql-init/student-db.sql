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
