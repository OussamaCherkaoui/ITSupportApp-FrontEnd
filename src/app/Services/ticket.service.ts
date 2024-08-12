import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Ticket} from "../models/Ticket";

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:8081/ticket';
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
    return this.http.post<any>(`${this.apiUrl}/saveTicket`,ticket, { headers: this.getHeaders() });
  }

  public getAllTicketByIdUser(id:number):Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getTicketsByIdUser/${id}`, { headers: this.getHeaders() });
  }

  public attributTechnicien(idTicket:number,idtechnicien:number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${idTicket}/${idtechnicien}`, { headers: this.getHeaders() });
  }

  public getAllTickets():Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getAllTicket`, { headers: this.getHeaders() });
  }
  public getAllTicketsByIdTechnicien(id:number):Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getAllTicketByTechnicien/${id}`, { headers: this.getHeaders() });
  }

  public getAllTicketByIdSignalPanne(id: number):Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getAllTicketByIdSignalPanne/${id}`, { headers: this.getHeaders() });
  }
}
