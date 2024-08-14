import {Component, OnInit} from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardTitle
} from "@angular/material/card";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {Ticket} from "../models/Ticket";
import {MatButton} from "@angular/material/button";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {EquipementService} from "../Services/equipement.service";
import {PanneService} from "../Services/panne.service";
import {DecodejwtService} from "../Services/decodejwt.service";
import {SignalPanneService} from "../Services/signal-panne.service";
import {TicketService} from "../Services/ticket.service";
import {SignalPanne} from "../models/signal-panne";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {flush} from "@angular/core/testing";
import {Equipement} from "../models/equipement";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";

@Component({
  selector: 'app-technicien',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    NgForOf,
    NgIf,
    MatButton,
    MatCardActions,
    FormsModule,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatCardHeader,
    MatCardImage,
    MatCardTitle,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatSuffix,
    DatePipe
  ],
  templateUrl: './technicien.component.html',
  styleUrl: './technicien.component.css'
})
export class TechnicienComponent implements OnInit{

  isTicket: boolean=true;
  tickets: Ticket[]=[];
  idTechnicien!: number;
  signalPanne!:SignalPanne;
  equipement!:Equipement;
  isSignalPanne: boolean=false;
  isChangeEtat: boolean=false;
  etatForm: FormGroup;
  isEquipement: boolean=false;

  constructor(
    private fb: FormBuilder,
    private equipementService: EquipementService,
    private decodeService:DecodejwtService,
    private signalPanneService: SignalPanneService,
    private ticketService:TicketService
  ) {
this.etatForm=this.fb.group({
  etat: ['',Validators.required]
});
  }

  getTicketsByIdTechnicien(id:number)
  {
    this.tickets=[];
    this.ticketService.getAllTicketsByIdTechnicien(id).subscribe(data => {
      this.tickets = data;
      console.log(data);
    });
  }

  goToPanneSignale(id: number | undefined) {
    this.signalPanneService.getSignalPanneByIdTicket(id).subscribe(data=>{
      if (data)
      {
        this.signalPanne=data;
        this.isSignalPanne=true;
        this.isTicket=false
      }
      console.log(data)
    });
  }

  ngOnInit(): void {
    this.decodeService.getIdByUsername().subscribe(data=>{
      this.idTechnicien=data;
      this.getTicketsByIdTechnicien(data);
    });
  }

  updateEtat() {
    this.signalPanneService.changeEtatSignalPanne(this.signalPanne.id!,this.etatForm.get('etat')?.value).subscribe(
      data=>{
      if(data)
      {
        this.isChangeEtat=false;
        this.signalPanne=data;
      }
      }
    );

  }

  showFormEtat() {
    this.isChangeEtat=true;
  }

  goToTickets() {
    this.isEquipement=false;
    this.isTicket=true;
    this.isSignalPanne=false;
    this.isChangeEtat=false;
  }

  goToEquipement() {

    this.equipementService.getEquipementByIdSignalPanne(this.signalPanne.id).subscribe(data=>{
      if (data)
      {
        console.log(data)
        this.equipement=data;
        this.isTicket=false;
        this.isSignalPanne=false;
        this.isEquipement=true;
      }
    });
  }
}
