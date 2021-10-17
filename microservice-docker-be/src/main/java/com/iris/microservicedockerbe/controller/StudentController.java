package com.iris.microservicedockerbe.controller;

import com.iris.microservicedockerbe.exception.StudentNotFoundException;
import com.iris.microservicedockerbe.model.Student;
import com.iris.microservicedockerbe.repository.StudentRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class StudentController {

    private final StudentRepository repository;

    StudentController(StudentRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/v1.0/students")
    List<Student> getAllStudents(){
        return repository.findAll();
    }

    @GetMapping("/v1.0/student/{id}")
    Student getStudent(@PathVariable Integer id){
        return repository.findById(id).orElseThrow(() -> new StudentNotFoundException(id));
    }

    @PostMapping("/v1.0/students/create")
    Student newStudent(@RequestBody Student student) {
        return repository.save(student);
    }


}
