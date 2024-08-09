import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../models/User";
import {BehaviorSubject, map, Observable} from "rxjs";
import {AuthenticationRequest} from "../models/AuthenticationRequest";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private apiUrl: string;

  private idUser = new BehaviorSubject<number>(0);

  public getIdUser(): Observable<number> {
    return this.idUser.asObservable();
  }

  public setIdUser(id:number) {
    this.idUser.next(id);
  }

  private loggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem('jwt'));

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  public loginActive() {
    this.loggedIn.next(true);
  }

  public logout() {
    localStorage.removeItem('jwt');
    this.loggedIn.next(false);
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


  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:8081/authentification';
  }


  public login(authRequest: AuthenticationRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, authRequest).pipe(
      map(response => {
        console.log(response);
        return response;
      })
    );
  }




  public findIdByUsername(username: String) {
    return this.http.get<any>(`${this.apiUrl}/getIdByUserName/${username}`, { headers: this.getHeaders() });
  }

  public getUserById(id: any) {
    return this.http.get<any>(`${this.apiUrl}/getUserByIdUser/${id}`, { headers: this.getHeaders() });
  }
}
