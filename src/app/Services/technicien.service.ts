import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Admin} from "../models/admin";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TechnicienService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:8081/technicien';
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
  public getAlltechnicien(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getAllTechnicien`, { headers: this.getHeaders() });
  }

}
