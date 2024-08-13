export class Ticket {
  id?: number;
  dateOuverture?: string;
  description?: string;
  signalPanne_id?: number;
  technicien_id!: number;


  constructor(data?: Partial<Ticket>) {
    if (data) {
      this.id = data.id;
      this.dateOuverture = data.dateOuverture;
      this.description = data.description;
      this.signalPanne_id = data.signalPanne_id;
      this.technicien_id!= data.technicien_id;
    }
  }
}
