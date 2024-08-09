import {Component, OnInit} from '@angular/core';
import {MatButton, MatButtonModule} from "@angular/material/button";
import {
  MatCardContent,
  MatCardHeader,
  MatCardModule,
} from "@angular/material/card";
import {NgForOf, NgIf} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FormsModule} from "@angular/forms";
import {MatNativeDateModule} from "@angular/material/core";
import {TicketService} from "../Services/ticket.service";
import {AuthentificationService} from "../Services/authentification.service";
import {User} from "../models/User";
import {Ticket} from "../models/Ticket";

@Component({
  selector: 'app-admin',
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
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{
  users: User[]=[];
  tickets: Ticket[]=[];

  constructor(
    private ticketService: TicketService,
    private userService: AuthentificationService,
  ) {}

  ngOnInit(): void {
    this.GetUsers();
  }

  GetEquipements(){

  }
  GetTickets(){
    this.ticketService.getAllTickets().subscribe(data => {
      this.tickets = data;
    });
  }
  GetUsers(){

  }
}
