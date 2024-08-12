import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatFormFieldModule} from "@angular/material/form-field";
import {AuthenticationRequest} from "../models/AuthenticationRequest";
import {AuthentificationService} from "../Services/authentification.service";
import {Router} from "@angular/router";
import {DecodejwtService} from "../Services/decodejwt.service";
import {User} from "../models/User";
import {Role} from "../models/Role";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatButton,
    MatInput
  ],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent implements OnInit{
  user!:User;
  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  error:  string = '';
  authRequest: AuthenticationRequest = { username: '', password: '' };

  constructor(private fb: FormBuilder,private srvd:DecodejwtService,private authService: AuthentificationService,private router: Router) {}


  login(): void {
    this.authRequest.username=this.form.get('username')?.value!;
    this.authRequest.password=this.form.get('password')?.value!;

    this.authService.login(this.authRequest).subscribe(
      response => {
        if (response && response.token) {
          localStorage.setItem("jwt", response.token);
          this.srvd.getToken();
          this.srvd.getIdByUsername().subscribe(
            id => {
              this.authService.setIdUser(id);
              this.authService.getUserById(id).subscribe(res => {
                this.user = res;
                this.authService.loginActive();
                if (this.user.role === Role.ADMIN) {
                  this.router.navigateByUrl("/admin");
                } else if (this.user.role === Role.USER){
                  this.router.navigateByUrl(`/user`);
                }
                else{
                  this.router.navigateByUrl('/technicien');
                }
              });
            }
          );
        } else {
          this.error = "username ou password incorrect";
        }
      },
      error => {
        this.error = "erreur lors d' authentification. Réssayer!!";
      }
    );
  }

  ngOnInit(): void {
  }
}
