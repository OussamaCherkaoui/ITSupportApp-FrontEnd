export class SignalPanne {
  id?: number;
  dateEnregistrement?: string ;
  etat?: string;
  user_id?: number;
  equipement_id?: number;
  panne_id?: number;


  constructor(data?: Partial<SignalPanne>) {
    if (data) {
      this.id = data.id;
      this.dateEnregistrement = data.dateEnregistrement;
      this.etat = data.etat;
      this.user_id = data.user_id;
      this.equipement_id = data.equipement_id;
      this.panne_id = data.panne_id;
    }
  }
}
