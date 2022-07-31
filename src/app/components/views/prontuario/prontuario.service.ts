import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Prontuario } from './prontuario.model' 
import { ProntuarioLista } from './prontuarioLista.model';

@Injectable({
  providedIn: 'root'
})
export class ProntuarioService {

  baseUrl: String = environment.baseUrl;
  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

  pesquisarTodos():Observable<ProntuarioLista[]>{
/*    const tokenString = localStorage.getItem('access_token');
    const token = JSON.parse(tokenString?tokenString:'');
    const headers = {
      'Authorization':'Bearer ' + token.access_token
    } */
    const url = `${this.baseUrl}/prontuariosMedicasRest`
    return this.http.get<ProntuarioLista[]>(url);//,{headers});
  }

  pesquisarPorId(id: String): Observable<ProntuarioLista>{
    const url = `${this.baseUrl}/prontuariosMedicasRest/${id}`
    return this.http.get<ProntuarioLista>(url);
  }

  pesquisarPorChaveComposta(id: string): Observable<ProntuarioLista>{
    const url = `${this.baseUrl}/prontuariosMedicasRest/chaveComposta/${id}`
    return this.http.get<ProntuarioLista>(url);
  }

  incluir(prontuario: ProntuarioLista):Observable<ProntuarioLista>{
    const url=`${this.baseUrl}/prontuariosMedicasRest`;
    return this.http.post<ProntuarioLista>(url, prontuario);
  }

  editar(id: String, prontuario: ProntuarioLista):Observable<ProntuarioLista>{
    const url=`${this.baseUrl}/prontuariosMedicasRest/${id}`;
    return this.http.put<ProntuarioLista>(url, prontuario);
  }

  excluir(id: String): Observable<void>{
    const url=`${this.baseUrl}/prontuariosMedicasRest/${id}`;
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
