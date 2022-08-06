import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokenUrl: string = environment.baseUrl + environment.obterTokenUrl;
  clientID: string = environment.clientId;
  clientSecret: string = environment.clientSecret;
  jwtHelper: JwtHelperService = new JwtHelperService();
  
  constructor(
    private http: HttpClient
  ) { }

  obterToken(){
    const tokenString = localStorage.getItem('access_token');
    if (tokenString)
    {
      const token = JSON.parse(tokenString);
      const jwt = token.access_token;
      return jwt;
    }
  }

  obterCargo(){
    const tokenString = localStorage.getItem('access_token');
    if (tokenString)
    {
      const token = JSON.parse(tokenString);
      return token.usuario.cargo;
    }
  }

  obterIdUsuario(){
    const tokenString = localStorage.getItem('access_token');
    if (tokenString)
    {
      const token = JSON.parse(tokenString);
      return token.usuario.id;
    }
  }

  encerrarSessao(){
    localStorage.removeItem('access_token');
  }

  getUsuarioAutenticado(){
    const token = this.obterToken();
    if (token)
    {
      const usuario = this.jwtHelper.decodeToken(token).user_name;
      return usuario;
    }
    return null;
  }

  getCargo(){
    const perfil = this.obterCargo();
    if (perfil)
    {
      return perfil;
    }
    return null;
  }

  getIdUsuario(){
    const perfil = this.obterIdUsuario();
    if (perfil)
    {
      return perfil;
    }
    return null;
  }

  isAuthenticated() : boolean{
    const token = this.obterToken();
    if(token)
    {
      const expired = this.jwtHelper.isTokenExpired(token);
      return !expired;
    }
    return false;
  }

  tentarLogar(username: string, password: string) : Observable<any>{
    const params = new HttpParams()
                          .set('username', username)
                          .set('password', password)
                          .set('grant_type', 'password');
    const headers = {
      'Authorization':'Basic ' + btoa(`${this.clientID}:${this.clientSecret}`),
      'Content-Type':'application/x-www-form-urlencoded'
    }
    localStorage.removeItem('access_token');
    return this.http.post(this.tokenUrl,params.toString(),{headers:headers})
  }
}
