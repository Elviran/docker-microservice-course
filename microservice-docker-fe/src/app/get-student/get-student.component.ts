import { Component, OnInit } from '@angular/core';
import { Student } from '../_models/Student';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../_services/alert.service';

import { StudentService } from '../_services/student.service';

@Component({
  selector: 'app-get-student',
  templateUrl: './get-student.component.html',
  styleUrls: ['./get-student.component.css']
})
export class GetStudentComponent {
  
  student:Student | undefined;
  findStudentForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private studentService: StudentService, private alertService: AlertService) { 
    this.findStudentForm = this.formBuilder.group({
        studentId: ['', Validators.required, Number]
      });
  }

  // Gets a specific student with the given id.
  getStudent(id:string){
    this.studentService.getStudent(id).subscribe(
      response => {
        this.student = response;
        return null;
      }, 
      error => {
        this.student = undefined;
        this.alertService.error("Error fetching student with the given id" + error);
      }
    )
  }
  

}
