import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../cliente/cliente.model';
import { Funcionario } from '../funcionario/funcionario.model';
import { Prontuario } from './prontuario.model';

@Injectable({
  providedIn: 'root'
})
export class ProntuarioService {

  baseUrl: String = environment.baseUrl;
  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

  pesquisarTodos():Observable<Prontuario[]>{
/*    const tokenString = localStorage.getItem('access_token');
    const token = JSON.parse(tokenString?tokenString:'');
    const headers = {
      'Authorization':'Bearer ' + token.access_token
    } */
    const url = `${this.baseUrl}/prontuariosMedicosRest`
    return this.http.get<Prontuario[]>(url);//,{headers});
  }

  pesquisarPorId(id: String): Observable<Prontuario>{
    const url = `${this.baseUrl}/prontuariosMedicosRest/${id}`
    return this.http.get<Prontuario>(url);
  }

  pesquisarPorChaveComposta(id: string): Observable<Prontuario>{
    const url = `${this.baseUrl}/prontuariosMedicosRest/chaveComposta/${id}`
    return this.http.get<Prontuario>(url);
  }

  pesquisarPorFiltros(medico: string, cliente: string, dataReg: string): Observable<Prontuario[]>{
    const url = `${this.baseUrl}/prontuariosMedicosRest/${medico}/${cliente}/${dataReg}`
    return this.http.get<Prontuario[]>(url);
  }

  incluir(prontuario: Prontuario):Observable<Prontuario>{
    const url=`${this.baseUrl}/prontuariosMedicosRest`;
    return this.http.post<Prontuario>(url, prontuario);
  }

  editar(id: String, prontuario: Prontuario):Observable<Prontuario>{
    const url=`${this.baseUrl}/prontuariosMedicosRest/${id}`;
    return this.http.put<Prontuario>(url, prontuario);
  }

  excluir(id: String): Observable<void>{
    const url=`${this.baseUrl}/prontuariosMedicosRest/${id}`;
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
