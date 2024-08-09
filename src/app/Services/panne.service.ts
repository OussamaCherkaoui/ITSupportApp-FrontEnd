import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Equipement} from "../models/equipement";
import {Panne} from "../models/panne";

@Injectable({
  providedIn: 'root'
})
export class PanneService {

  private apiUrlAdmin: string;
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrlAdmin = 'http://localhost:8081/admin';
    this.apiUrl = 'http://localhost:8081/forAll';
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

  public getAllPannes():Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getAllPannes`, { headers: this.getHeaders() });
  }

  public savePanne(panne:Panne): Observable<any> {
    return this.http.post<any>(`${this.apiUrlAdmin}/addPanne`,panne, { headers: this.getHeaders() });
  }

  public updatePanne(panne:Panne): Observable<any> {
    return this.http.put<any>(`${this.apiUrlAdmin}/updatePanne`,panne, { headers: this.getHeaders() });
  }

  public deletePanne(id: number | undefined): Observable<any> {
    return this.http.delete<any>(`${this.apiUrlAdmin}/deletePanne/${id}`, { headers: this.getHeaders() });
  }
}
