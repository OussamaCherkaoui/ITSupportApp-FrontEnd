import {Component, OnInit} from '@angular/core';
import {MatAnchor, MatButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardTitle
} from "@angular/material/card";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {EquipementService} from "../Services/equipement.service";
import {TechnicienService} from "../Services/technicien.service";
import {PanneService} from "../Services/panne.service";
import {SignalPanneService} from "../Services/signal-panne.service";
import {RegisterService} from "../Services/register.service";
import {TicketService} from "../Services/ticket.service";
import {Equipement} from "../models/equipement";
import {Panne} from "../models/panne";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {DecodejwtService} from "../Services/decodejwt.service";
import {SignalPanne} from "../models/signal-panne";
import {Ticket} from "../models/Ticket";
import {tick} from "@angular/core/testing";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatAnchor,
    MatToolbar,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardImage,
    MatCardTitle,
    NgForOf,
    NgIf,
    FormsModule,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatRadioButton,
    MatRadioGroup,
    DatePipe
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
  isEquipement: boolean=true;
  isSignalPanne:boolean=false;
  formSignalPanne:boolean=false;
  equipements: Equipement[]=[];
  pannes: Panne[] = [];
  pannesSignale:SignalPanne[]=[];
  tickets: Ticket[]=[];
  signalForm: FormGroup;
  ticketForm: FormGroup;
  idEquipement!:number;
  idUser!:number;
  messageSignalement: string='';
  messageTicket: string='';
  isTicket: boolean=false;
  isFormAddTicket:boolean=false;

  ticket:Ticket = {
    technicien_id: 0,
    id:0,
    signalPanne_id:0,
    description:'',
    dateOuverture:undefined
}


  constructor(
    private fb: FormBuilder,
    private equipementService: EquipementService,
    private panneService: PanneService,
    private decodeService:DecodejwtService,
    private signalPanneService: SignalPanneService,
    private ticketService:TicketService
  ) {
    this.signalForm = this.fb.group({
      idPanne: ['']
    });
    this.ticketForm = this.fb.group({
      description:[''],
    });
  }
  navigateTo(choise: string) {
    if (choise=='equipement')
    {
      this.messageTicket='';
      this.isFormAddTicket=false;
      this.isTicket=false;
      this.formSignalPanne=false;
      this.isEquipement=true;
      this.isSignalPanne=false;
    }
    else if (choise=='panneSignale'){
      this.messageTicket='';
      this.isFormAddTicket=false;
      this.isTicket=false;
      this.formSignalPanne=false;
      this.isEquipement=false;
      this.isSignalPanne=true;
      this.getSignaPanneByIdUser(this.idUser);
    }
  }

  ngOnInit(): void {
    this.getEquipements();
    this.decodeService.getIdByUsername().subscribe(data=>{
      this.idUser=data;
    });
  }
  getEquipements(){
    this.equipementService.getAllEquipement().subscribe(data => {
      this.equipements = data;
    });
  }
  getPannes(){
    this.panneService.getAllPannes().subscribe(data => {
      this.pannes = data;
    });
  }

  signalPanne(idEquipement: number) {
    this.idEquipement=idEquipement;
    this.formSignalPanne=true;
    this.getPannes();
  }

  confirmSignalement() {
    this.signalPanneService.saveSignalPanne(this.idUser,this.idEquipement,this.signalForm.get('idPanne')?.value).subscribe(data => {
      if (data)
      {
        this.messageSignalement='Signalement effectuer avec succes';
      }
    });
  }

  getSignaPanneByIdUser(id:number)
  {
    this.signalPanneService.getAllSignalPanneByIdUser(id).subscribe(data => {
      this.pannesSignale = data;
    });
  }

  getTicketsBySignalPanne(id:number)
  {
    this.tickets=[];
    this.ticketService.getAllTicketByIdSignalPanne(id).subscribe(data => {
      this.tickets = data;
    });
  }

  showTicketSignalPanne(id: number) {
    this.isSignalPanne=false;
    this.isTicket=true;
    this.getTicketsBySignalPanne(id);
  }

  addTicket(idPanne: number) {
    this.ticket.signalPanne_id=idPanne;
    this.isSignalPanne=false;
    this.isFormAddTicket=true;
  }

  addTicketConfirm() {

    this.ticket.description=this.ticketForm.get('description')?.value;
    console.log(this.ticket.signalPanne_id);
    this.ticketService.saveTicket(this.ticket).subscribe(data=>{
      if (data)
      {
        this.messageTicket='Ticket Bien Ajouté';
      }
    });
  }
}
