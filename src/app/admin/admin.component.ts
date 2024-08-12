import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCardContent, MatCardHeader, MatCardModule,} from "@angular/material/card";
import {NgForOf, NgIf} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatNativeDateModule, MatOption} from "@angular/material/core";
import {TicketService} from "../Services/ticket.service";
import {AuthentificationService} from "../Services/authentification.service";
import {Ticket} from "../models/Ticket";
import {Equipement} from "../models/equipement";
import {EquipementService} from "../Services/equipement.service";
import {MatToolbar, MatToolbarModule} from "@angular/material/toolbar";
import {MatMenu, MatMenuItem, MatMenuModule, MatMenuTrigger} from "@angular/material/menu";
import {Panne} from "../models/panne";
import {PanneService} from "../Services/panne.service";
import {User} from "../models/User";
import {Role} from "../models/Role";
import {RegisterService} from "../Services/register.service";
import {Utilisateur} from "../models/utilisateur";
import {MatRadioButton, MatRadioGroup, MatRadioModule} from "@angular/material/radio";
import {SignalPanne} from "../models/signal-panne";
import {SignalPanneService} from "../Services/signal-panne.service";
import {MatSelect} from "@angular/material/select";
import {Technicien} from "../models/technicien";
import {TechnicienService} from "../Services/technicien.service";

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
    MatNativeDateModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatMenuModule,
    MatMenuTrigger,
    MatMenuItem,
    MatRadioModule,
    MatRadioGroup,
    MatRadioButton,
    MatSelect,
    MatOption
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{
  equipements: Equipement[]=[];
  pannesSignale:SignalPanne[]=[];
  tickets: Ticket[]=[];
  techniciens: Technicien[] = [];
  selectedTechnicienId!: number;
  showEquipements: boolean=true;
  addEquipementForm: boolean=false;
  updateEquipementForm: boolean=false;
  equipementForm: FormGroup;
  message: string='';
  equipement:Equipement={
    id: 0,
    nom: '',
    marque: '',
    modele: '',
    dateAchat:'',
    dateDerniereReparation: '',
    etat: '',
    picture: ''
  };
  panne:Panne={
    id:0,
    description:'',
    dateCreation:''
  }
  isEquipement: boolean=true;
  isPanne:boolean=false;
  isRegistre:boolean=false;

  isSignalPanne: boolean=false;
  isTicket: boolean=false;


  pannes: Panne[] = [];
  panneForm: FormGroup;
  showPannes = true;
  addPanneForm = false;
  updatePanneForm = false;
  messagePanne: string ='';

  signUpForm: FormGroup;
  utilisateur : Utilisateur = {
    email: '', idUser: 0, password: '', telephone: '', role: Role.ADMIN, username: ''
  }
  messageSignUp:  string = '';
  idSignalPanne!:number;


  constructor(
    private fb: FormBuilder,
    private equipementService: EquipementService,
    private technicienService: TechnicienService,
    private panneService: PanneService,
    private signalPanneService: SignalPanneService,
    private registerService: RegisterService,
    private ticketService:TicketService
  ) {
    this.equipementForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      marque: ['', [Validators.required]],
      modele: ['', [Validators.required]],
      dateAchat: ['', [Validators.required]],
      dateDerniereReparation: [''],
      etat: ['', [Validators.required]],
      picture: ['', [Validators.required]]
    });
    this.panneForm = this.fb.group({
      id: [''],
      description: ['', Validators.required],
      dateCreation:['']
    });
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role:['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)]]
    });
  }

  ngOnInit(): void {
    this.getEquipements();
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
  getSignaPanneByEquipement(id:number)
  {
    this.signalPanneService.getAllSignalPanneByIdEquipement(id).subscribe(data => {
      this.pannesSignale = data;
    });
  }
  getTicketsBySignalPanne(id:number)
  {
    this.ticketService.getAllTicketByIdSignalPanne(id).subscribe(data => {
      this.tickets = data;
    });
  }

  deleteEquipement(id: number | undefined) {
    this.equipementService.deleteEquipement(id).subscribe(data => {
      if (data)
      {
        this.getEquipements();
      }
    });
  }


  hiddenEquipementForm() {
    this.message='';
    this.equipementForm.reset();
    this.showEquipements=true;
    this.addEquipementForm=false;
    this.updateEquipementForm=false;
  }

  showAddEquipementForm() {
    this.showEquipements=false;
    this.addEquipementForm=true;
  }

  showUpdateEquipementForm(equipement: Equipement) {
    this.showEquipements=false;
    this.updateEquipementForm=true;
    this.equipementForm.get('id')?.setValue(equipement.id);
    this.equipementForm.get('name')?.setValue(equipement.nom);
    this.equipementForm.get('marque')?.setValue(equipement.marque);
    this.equipementForm.get('modele')?.setValue(equipement.modele);
    this.equipementForm.get('dateAchat')?.setValue(equipement.dateAchat);
    this.equipementForm.get('dateDerniereReparation')?.setValue(equipement.dateDerniereReparation);
    this.equipementForm.get('etat')?.setValue(equipement.etat);
    this.equipementForm.get('picture')?.setValue(equipement.picture);
  }

  formatedDate(date:Date){
    console.log(date.getFullYear());
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  affectValueFormToEquipement(){
    const formattedDateAchat = this.formatedDate(new Date(this.equipementForm.get('dateAchat')?.value));
    const formattedDateReparation = this.formatedDate(new Date(this.equipementForm.get('dateDerniereReparation')?.value));

    this.equipement.id=this.equipementForm.get('id')?.value;
    this.equipement.nom=this.equipementForm.get('name')?.value;
    this.equipement.marque=this.equipementForm.get('marque')?.value;
    this.equipement.modele=this.equipementForm.get('modele')?.value;
    this.equipement.dateAchat=formattedDateAchat;
    this.equipement.dateDerniereReparation=formattedDateReparation;
    this.equipement.etat=this.equipementForm.get('etat')?.value;
    this.equipement.picture=this.equipementForm.get('picture')?.value;
  }


  addEquipement() {

    this.affectValueFormToEquipement();

    this.equipementService.saveEquipement(this.equipement).subscribe(data => {
      if (data)
      {
        this.getEquipements();
        this.message='equipement ajouter avec succes';
      }
      else{
        this.message="Erreur lors d' ajout !! Ressayer "
      }
    });
  }

  updateEquipement() {
    this.affectValueFormToEquipement();

    this.equipementService.updateEquipement(this.equipement).subscribe(data => {
      if (data)
      {
        this.getEquipements();
        this.message='equipement modifier avec succes';
      }
      else{
        this.message="Erreur lors de modification !! Ressayer "
      }
    });
  }

  goToEquipement()
  {
    this.isTicket=false;
    this.isSignalPanne=false;
    this.isEquipement=true;
    this.isPanne=false;
    this.isRegistre=false;
  }
  goToPanne()
  {
    this.isEquipement=false;
    this.isPanne=true;
    this.isRegistre=false;
  }
  goToOuvrirCompte()
  {
    this.isEquipement=false;
    this.isPanne=false;
    this.isRegistre=true;
  }
  navigateTo(choise: string) {
    if (choise=='equipement')
    {
      this.goToEquipement();
    }
    else if (choise=='panne'){
      this.goToPanne();
      this.getPannes();
    }
    else{
      this.goToOuvrirCompte();
    }
  }

  showAddPanneForm() {
    this.addPanneForm = true;
    this.updatePanneForm = false;
    this.showPannes = false;
  }

  showUpdatePanneForm(panne: Panne) {
    this.addPanneForm = false;
    this.updatePanneForm = true;
    this.showPannes = false;
    this.panneForm.get('description')?.setValue(panne.description);
    this.panneForm.get('id')?.setValue(panne.id);
    this.panneForm.get('dateCreation')?.setValue(panne.dateCreation);
  }

  hiddenPanneForm() {
    this.messagePanne='';
    this.addPanneForm = false;
    this.updatePanneForm = false;
    this.showPannes = true;
    this.panneForm.reset();
  }

  addPanne() {
    this.panne.id=0;
    this.panne.description=this.panneForm.get('description')?.value;
    this.panneService.savePanne(this.panne).subscribe(data => {
      if (data)
      {
          this.getPannes();
        this.messagePanne='Panne Ajouter avec succes';
      }
      else{
        this.messagePanne="Erreur lors d' ajout !! Ressayer "
      }
    });
  }

  updatePanne() {
    this.panne.description=this.panneForm.get('description')?.value;
    this.panne.id=this.panneForm.get('id')?.value;
    this.panne.dateCreation=this.panneForm.get('dateCreation')?.value;
    this.panneService.updatePanne(this.panne).subscribe(data => {
      if (data)
      {
        this.getPannes();
        this.messagePanne='Panne Modifier avec succes';
      }
      else{
        this.messagePanne="Erreur lors de modification !! Ressayer "
      }
    });
  }

  deletePanne(id: number | undefined) {
    this.panneService.deletePanne(id).subscribe(data => {
      if (data)
      {
        this.getPannes();
      }
    });
  }

  onSubmit() {
    this.utilisateur.username = this.signUpForm.get('username')?.value;
    this.utilisateur.email = this.signUpForm.get('email')?.value;
    this.utilisateur.password = this.signUpForm.get('password')?.value;
    this.utilisateur.telephone = this.signUpForm.get('phone')?.value;
    this.utilisateur.role=this.signUpForm.get('role')?.value;

    if (this.utilisateur.username && this.utilisateur.email && this.utilisateur.password && this.utilisateur.telephone&& this.utilisateur.role) {
      if (this.utilisateur.role=="ADMIN") {
        this.registerService.registerAdmin(this.utilisateur).subscribe(data=>{
          console.log(data);
          this.messageSignUp='Compte Admin créer avec succées';
        });
      } else if (this.utilisateur.role=="TECH")
      {
        this.registerService.registerTechnicien(this.utilisateur).subscribe(data=>{
          console.log(data);
          this.messageSignUp='Compte Technicien créer avec succées';
        });
      }
    }
    else {
      console.log('Remplit toutes les champs !!');
    }
  }

  showSignalPanne(id: number) {
    this.isEquipement=false;
    this.isSignalPanne=true;
    this.getSignaPanneByEquipement(id);
  }

  getAllTechnicien(){
    this.technicienService.getAlltechnicien().subscribe(data => {
      this.techniciens = data;
    });
  }
  showTicketSignalPanne(id: number) {
    this.idSignalPanne=id;
    this.isSignalPanne=false;
    this.isTicket=true;
    this.getTicketsBySignalPanne(id);
    this.getAllTechnicien();
  }

  attribuerTechnicien(ticketId: number): void {
    if (this.selectedTechnicienId)
    {
      console.log('ssssssssss');
      this.ticketService.attributTechnicien(ticketId,this.selectedTechnicienId).subscribe(data => {
        this.showTicketSignalPanne(this.idSignalPanne);
      });
    }
  }

  onTechnicienChange() {
    console.log('Technicien sélectionné :', this.selectedTechnicienId);
  }
}
