import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Equipement} from "../models/equipement";

@Injectable({
  providedIn: 'root'
})
export class EquipementService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:8081/equipement';
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

  public getAllEquipement():Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getAllEquipements`, { headers: this.getHeaders() });
  }

  public saveEquipement(equipement:Equipement): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addEquipement`,equipement, { headers: this.getHeaders() });
  }

  public updateEquipement(equipement:Equipement): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updateEquipement`,equipement, { headers: this.getHeaders() });
  }

  public deleteEquipement(id: number | undefined): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deleteEquipement/${id}`, { headers: this.getHeaders() });
  }
  public changeEtatEquipement(equipement:Equipement,etat:string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${etat}`,equipement, { headers: this.getHeaders() });
  }

}
