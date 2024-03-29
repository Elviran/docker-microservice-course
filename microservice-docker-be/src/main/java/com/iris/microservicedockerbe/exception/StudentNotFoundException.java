package com.iris.microservicedockerbe.exception;

public class StudentNotFoundException extends RuntimeException {
    public StudentNotFoundException(Integer id) {
        super("Could not find student with the given id " + id);
    }
}
