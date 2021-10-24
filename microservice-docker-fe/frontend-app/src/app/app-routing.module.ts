import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CreateStudentComponent } from './create-student/create-student.component';
import { GetStudentComponent } from './get-student/get-student.component';
import { GetStudentsComponent } from './get-students/get-students.component';

const routes: Routes = [
  {path:  "ViewStudents", pathMatch:  "full", component: GetStudentsComponent},
  {path:  "FindStudent", pathMatch:  "full", component: GetStudentComponent},
  {path:  "AddStudent", pathMatch:  "full", component: CreateStudentComponent},
  {path: 'ContactUs', component : ContactUsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
