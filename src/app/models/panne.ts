export class Panne {
  id?: number;
  dateCreation?: string ;
  description?: string;



  constructor(data?: Partial<Panne>) {
    if (data) {
      this.id = data.id;
      this.dateCreation = data.dateCreation;
      this.description = data.description;
    }
  }
}
