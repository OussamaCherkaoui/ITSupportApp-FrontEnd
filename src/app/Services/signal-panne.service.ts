import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Panne} from "../models/panne";
import {Observable} from "rxjs";
import {SignalPanne} from "../models/signal-panne";
import {Equipement} from "../models/equipement";

@Injectable({
  providedIn: 'root'
})
export class SignalPanneService {

  private apiUrl: string;


  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:8081/signalPanne';
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

  public saveSignalPanne(signalPanne:SignalPanne): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/saveSignalPanne`,signalPanne, { headers: this.getHeaders() });
  }

  public getAllSignalPanneByIdUser(id: number | undefined):Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getAllSignalPannesByIdUser/${id}`, { headers: this.getHeaders() });
  }
  public getAllSignalPanneByIdEquipement(id: number | undefined):Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getAllSignalPannesByIdEquipement/${id}`, { headers: this.getHeaders() });
  }
  public getAllSignalPanne():Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getAllSignalPannes`, { headers: this.getHeaders() });
  }
  public getAllSignalPannesByTechnicien(id: number | undefined):Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getAllSignalPannesByTechnicien/${id}`, { headers: this.getHeaders() });
  }
  public changeEtatSignalPanne(signalPanne:SignalPanne,etat:string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${etat}`,signalPanne, { headers: this.getHeaders() });
  }
}
