import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MatError, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {User} from "../models/User";
import {AuthentificationService} from "../Services/authentification.service";
import {Role} from "../models/Role";
import {RegisterService} from "../Services/register.service";

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    MatLabel,
    MatError,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit{
  signUpForm: FormGroup;
  user : User = {
    email: '', idUser: 0, password: '', telephone: '', role: Role.USER, username: ''
  }
  message:  string = '';

  constructor(private fb: FormBuilder,private registerService:RegisterService) {
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)]]
    });
  }

  onSubmit() {
    this.user.username = this.signUpForm.get('username')?.value;
    this.user.email = this.signUpForm.get('email')?.value;
    this.user.password = this.signUpForm.get('password')?.value;
    this.user.telephone = this.signUpForm.get('phone')?.value;

    if (this.user.username && this.user.email && this.user.password && this.user.telephone) {
      if (this.signUpForm.valid) {
        this.registerService.registerUser(this.user).subscribe(data=>{
          console.log(data);
          this.message='Compte créer avec succées';
        });
      } else {
        console.log('Remplit toutes les champs !!');
      }
    }
  }

  ngOnInit(): void {
  }
}
