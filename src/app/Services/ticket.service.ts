import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Ticket} from "../models/Ticket";

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private apiUrlUser: string;
  private apiUrlAdmin: string;
  private apiUrlTechnicien: string;

  constructor(private http: HttpClient) {
    this.apiUrlUser = 'http://localhost:8081/user';
    this.apiUrlAdmin = 'http://localhost:8081/admin';
    this.apiUrlTechnicien = 'http://localhost:8081/technicien';
  }
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt');
    if (!token) {
      console.error('No auth token found');
      return new HttpHeaders();
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }


  public saveTicket(ticket:Ticket): Observable<any> {
    return this.http.post<any>(`${this.apiUrlUser}/saveTicket`,ticket, { headers: this.getHeaders() });
  }

  public getAllTicketByIdUser(id:number):Observable<any> {
    return this.http.get<any>(`${this.apiUrlUser}/getTicketsByIdUser/${id}`, { headers: this.getHeaders() });
  }

  public attributTechnicien(ticket:Ticket,id:number): Observable<any> {
    return this.http.post<any>(`${this.apiUrlAdmin}/${id}`,ticket, { headers: this.getHeaders() });
  }

  public getAllTickets():Observable<any> {
    return this.http.get<any>(`${this.apiUrlAdmin}/getAllTicket`, { headers: this.getHeaders() });
  }
  public getAllTicketsByIdTechnicien(id:number):Observable<any> {
    return this.http.get<any>(`${this.apiUrlTechnicien}/getAllTicketByTechnicien/${id}`, { headers: this.getHeaders() });
  }

}
