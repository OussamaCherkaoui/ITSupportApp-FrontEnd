import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {MatCardActions, MatCardContent, MatCardHeader, MatCardModule} from "@angular/material/card";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {
  MatDatepicker,
  matDatepickerAnimations,
  MatDatepickerInput, MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {FormsModule, NgModel} from "@angular/forms";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatNativeDateModule} from "@angular/material/core";
import {TicketService} from "../Services/ticket.service";
import {Ticket} from "../models/Ticket";
import {Router} from "@angular/router";
import {routes} from "../app.routes";
import {LogInComponent} from "../log-in/log-in.component";
import {AuthentificationService} from "../Services/authentification.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCardHeader,
    MatCardContent,
    MatCardModule,
    MatDatepickerModule,
    FormsModule,
    MatNativeDateModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  idUser!:number;


  constructor(
    private ticketService: TicketService,
    private authService:AuthentificationService,
    private route:Router
  ) {}

  ngOnInit(): void {
    this.authService.getIdUser().subscribe(
      (userId) => {
        this.idUser = userId;
        console.log(userId);
        console.log(this.idUser);
      }
    );
  }

  reserveTicket(id: number | undefined) {
    const token = localStorage.getItem("jwt");
    if (token)
    {

    }
    else{
      this.route.navigateByUrl("/logIn");
    }
  }

  GetEquipements(){

  }

}
