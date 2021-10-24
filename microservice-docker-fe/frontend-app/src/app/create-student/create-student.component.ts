import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Student } from '../_models/Student';
import { AlertService } from '../_services/alert.service';
import { StudentService } from '../_services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {
  
  createStudentForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private studentService: StudentService, private alertService: AlertService) {
    this.createStudentForm = this.formBuilder.group({
      studentName: [''],
      studentSurname: [''],
      studentAge: [''],
      studentAddress: [''],
      scholasticYear: ['']
    })
  }

  ngOnInit(): void {
  }

  //create new students
  addStudent(){
    console.log(this.createStudentForm.value.studentName);
    let student = new Student(this.createStudentForm.value.studentName, this.createStudentForm.value.studentSurname, 
      this.createStudentForm.value.studentAge,  this.createStudentForm.value.studentAddress,  this.createStudentForm.value.scholasticYear)
    this.studentService.register(student).subscribe(
      response => {
        this.alertService.success("Student has been created");
        this.router.navigate(['/ViewStudents']);
      }, 
      error => {
        this.alertService.error("Error creating new student");
      }
    )
  }

}
