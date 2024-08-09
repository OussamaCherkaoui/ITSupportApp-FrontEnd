import { Injectable } from '@angular/core';
import {User} from "../models/User";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Admin} from "../models/admin";
import {Technicien} from "../models/technicien";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrlAdmin: string;
  private apiUrlUser: string;
  private apiUrlTechnicien: string;

  constructor(private http: HttpClient) {
    this.apiUrlAdmin = 'http://localhost:8081/admin';
    this.apiUrlUser = 'http://localhost:8081/user';
    this.apiUrlTechnicien = 'http://localhost:8081/technicien';
  }

  public registerAdmin(admin:Admin): Observable<any> {
    return this.http.post<any>(`${this.apiUrlAdmin}/register`,admin);
  }

  public registerUser(user:User): Observable<any> {
    return this.http.post<any>(`${this.apiUrlAdmin}/register`,user);
  }

  public registerTechnicien(technicien:Technicien): Observable<any> {
    return this.http.post<any>(`${this.apiUrlAdmin}/register`,technicien);
  }

}
