import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Agenda } from './agenda.model' 
import { AgendaLista } from './agendaLista.model';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  baseUrl: String = environment.baseUrl;
  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

  pesquisarTodos():Observable<AgendaLista[]>{
/*    const tokenString = localStorage.getItem('access_token');
    const token = JSON.parse(tokenString?tokenString:'');
    const headers = {
      'Authorization':'Bearer ' + token.access_token
    } */
    const url = `${this.baseUrl}/agendasMedicasRest`
    return this.http.get<AgendaLista[]>(url);//,{headers});
  }

  pesquisarPorId(id: String): Observable<Agenda>{
    const url = `${this.baseUrl}/agendasRest/${id}`
    return this.http.get<Agenda>(url);
  }

  incluir(agenda: AgendaLista):Observable<AgendaLista>{
    const url=`${this.baseUrl}/agendasMedicasRest`;
    return this.http.post<AgendaLista>(url, agenda);
  }

  editar(id: String, agenda: Agenda):Observable<Agenda>{
    const url=`${this.baseUrl}/agendasRest/${id}`;
    return this.http.put<Agenda>(url, agenda);
  }

  excluir(id: String): Observable<void>{
    const url=`${this.baseUrl}/agendasRest/${id}`;
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
