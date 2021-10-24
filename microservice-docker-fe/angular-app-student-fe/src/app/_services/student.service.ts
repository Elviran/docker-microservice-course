import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Student } from '../_models/Student';

@Injectable({ providedIn: 'root' })
export class StudentService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Student[]>(`http://localhost:8080/v1.0/students`);
    }

    getStudent(id: string) {
        return this.http.get<Student>(`http://localhost:8080/v1.0/student/${id}`)
    }

    
    register(student: Student) {
        return this.http.post(`http://localhost:8080/v1.0/students/create`, student);
    }
}