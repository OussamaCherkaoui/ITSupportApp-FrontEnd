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

  private apiUrlAdmin: string;
  private apiUrlUser: string;
  private apiUrlTechnicien: string;

  constructor(private http: HttpClient) {
    this.apiUrlAdmin = 'http://localhost:8081/admin';
    this.apiUrlUser = 'http://localhost:8081/user';
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

  public signalPanne(signalPanne:SignalPanne): Observable<any> {
    return this.http.post<any>(`${this.apiUrlUser}/signalPanne`,signalPanne, { headers: this.getHeaders() });
  }

  public getAllSignalPanneByIdUser(id: number | undefined):Observable<any> {
    return this.http.get<any>(`${this.apiUrlUser}/getAllSignalPannesByIdUser/${id}`, { headers: this.getHeaders() });
  }
  public getAllSignalPanneByIdEquipement(id: number | undefined):Observable<any> {
    return this.http.get<any>(`${this.apiUrlAdmin}/getAllSignalPannesByIdEquipement/${id}`, { headers: this.getHeaders() });
  }
  public getAllSignalPanne():Observable<any> {
    return this.http.get<any>(`${this.apiUrlAdmin}/getAllSignalPannes`, { headers: this.getHeaders() });
  }
  public getAllSignalPannesByTechnicien(id: number | undefined):Observable<any> {
    return this.http.get<any>(`${this.apiUrlAdmin}/getAllSignalPannesByTechnicien/${id}`, { headers: this.getHeaders() });
  }
  public changeEtatSignalPanne(signalPanne:SignalPanne,etat:string): Observable<any> {
    return this.http.put<any>(`${this.apiUrlTechnicien}/${etat}`,signalPanne, { headers: this.getHeaders() });
  }
}
