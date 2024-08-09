import { Injectable } from '@angular/core';
import {AuthentificationService} from "./authentification.service";
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class DecodejwtService {

  token: string ='' ;

  constructor(private srv:AuthentificationService ) {
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('jwt')||'';
    }
  }
  decodeToken(token: string ) {
    return jwtDecode(token);
  }
  public getUsernameFromToken() :any{
    const decodedToken = this.decodeToken(this.token);
    return decodedToken.sub;
  }
  getIdByUsername() {
    const username = this.getUsernameFromToken();
    return this.srv.findIdByUsername(username);
  }

}
