import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Student } from '../_models/Student';
import { AlertService } from '../_services/alert.service';
import { StudentService } from '../_services/student.service';

@Component({
  selector: 'app-get-students',
  templateUrl: './get-students.component.html',
  styleUrls: ['./get-students.component.css']
})
export class GetStudentsComponent implements OnInit{
  
  students:Student[] | undefined;
  createStudentForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private studentService: StudentService, private alertService: AlertService) {
    this.createStudentForm = this.formBuilder.group({
      studentName: [''],
      studentSurname: [''],
      studentAge: [''],
      studentAddress: [''],
      scholasticYear: ['']
    })
  }

  // when this component has been created, the getStudents method shall be executed.
  ngOnInit(): void {
    this.getStudents()
  }

  // get all list of students
  getStudents() {
    this.studentService.getAll().subscribe(
      response => {
        this.students = response;
      }, 
      error => {
        this.alertService.error("Error fetching students" + error);
      }
    )
  }


  

}
