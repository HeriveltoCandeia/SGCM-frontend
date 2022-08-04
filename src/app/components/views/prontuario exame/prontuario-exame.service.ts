import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProntuarioExame } from './prontuario-exame.model';

@Injectable({
  providedIn: 'root'
})
export class ProntuarioExameService {

  baseUrl: String = environment.baseUrl;
  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

  pesquisarTodos():Observable<ProntuarioExame[]>{
/*    const tokenString = localStorage.getItem('access_token');
    const token = JSON.parse(tokenString?tokenString:'');
    const headers = {
      'Authorization':'Bearer ' + token.access_token
    } */
    const url = `${this.baseUrl}/prontuariosExamesRest`
    return this.http.get<ProntuarioExame[]>(url);//,{headers});
  }

  pesquisarPorId(id: String): Observable<ProntuarioExame>{
    const url = `${this.baseUrl}/prontuariosExamesRest/${id}`
    return this.http.get<ProntuarioExame>(url);
  }

  pesquisarPorProntuarioExame(id: string): Observable<ProntuarioExame[]>{
    const url = `${this.baseUrl}/prontuariosExamesRest/prontuarioExame/${id}`
    return this.http.get<ProntuarioExame[]>(url);
  }
/*
  pesquisarPorChaveComposta(id: string): Observable<ProntuarioExame>{
    const url = `${this.baseUrl}/prontuariosExamesRest/chaveComposta/${id}`
    return this.http.get<ProntuarioExame>(url);
  }
*/
  incluir(prontuarioExame: ProntuarioExame):Observable<ProntuarioExame>{
    const url=`${this.baseUrl}/prontuariosExamesRest`;
    return this.http.post<ProntuarioExame>(url, prontuarioExame);
  }

  editar(id: String, prontuarioExame: ProntuarioExame):Observable<ProntuarioExame>{
    const url=`${this.baseUrl}/prontuariosExamesRest/${id}`;
    return this.http.put<ProntuarioExame>(url, prontuarioExame);
  }

  excluir(id: String): Observable<void>{
    const url=`${this.baseUrl}/prontuariosExamesRest/${id}`;
    return this.http.delete<void>(url);
  }

  mensagem(str: String): void{
    this._snack.open(`${str}`,'OK',{
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration:3000
    })
  }
}
