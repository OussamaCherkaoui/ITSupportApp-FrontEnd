export class Equipement {
  id?: number;
  nom?: string ;
  marque?: string;
  modele?: string;
  dateAchat?: string;
  dateDerniereReparation?: string;
  etat?: string;
  picture?: string;


  constructor(data?: Partial<Equipement>) {
    if (data) {
      this.id = data.id;
      this.nom = data.nom;
      this.marque = data.marque;
      this.modele = data.modele;
      this.dateAchat = data.dateAchat;
      this.dateDerniereReparation = data.dateDerniereReparation;
      this.etat = data.etat;
      this.picture = data.picture;
    }
  }
}

