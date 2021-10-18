import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {

  contactForm: FormGroup;
  errorMessage: any;

  //injecting contactsServices and formBuilder
  constructor( private formBuilder : FormBuilder, private _router : Router) { 
    this.contactForm = formBuilder.group({
      _id : ['0', [Validators.required]],
      name : ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      mobile : ['', [Validators.required,  Validators.pattern('[0-9]+')]],
      content :  ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
    });
  }


}
