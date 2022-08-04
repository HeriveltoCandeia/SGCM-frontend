import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProntuarioMedicamento } from './prontuario-medicamento.model';

@Injectable({
  providedIn: 'root'
})
export class ProntuarioMedicamentoService {

  baseUrl: String = environment.baseUrl;
  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

  pesquisarTodos():Observable<ProntuarioMedicamento[]>{
/*    const tokenString = localStorage.getItem('access_token');
    const token = JSON.parse(tokenString?tokenString:'');
    const headers = {
      'Authorization':'Bearer ' + token.access_token
    } */
    const url = `${this.baseUrl}/prontuariosMedicamentosRest`
    return this.http.get<ProntuarioMedicamento[]>(url);//,{headers});
  }

  pesquisarPorId(id: String): Observable<ProntuarioMedicamento>{
    const url = `${this.baseUrl}/prontuariosMedicamentosRest/${id}`
    return this.http.get<ProntuarioMedicamento>(url);
  }

  pesquisarPorProntuarioMedico(id: string): Observable<ProntuarioMedicamento[]>{
    const url = `${this.baseUrl}/prontuariosMedicamentosRest/prontuarioMedico/${id}`
    return this.http.get<ProntuarioMedicamento[]>(url);
  }
/*
  pesquisarPorChaveComposta(id: string): Observable<ProntuarioMedicamento>{
    const url = `${this.baseUrl}/prontuariosMedicamentosRest/chaveComposta/${id}`
    return this.http.get<ProntuarioMedicamento>(url);
  }
*/
  incluir(prontuario: ProntuarioMedicamento):Observable<ProntuarioMedicamento>{
    console.log(prontuario);
    const url=`${this.baseUrl}/prontuariosMedicamentosRest`;
    return this.http.post<ProntuarioMedicamento>(url, prontuario);
  }

  editar(id: String, prontuario: ProntuarioMedicamento):Observable<ProntuarioMedicamento>{
    const url=`${this.baseUrl}/prontuariosMedicamentosRest/${id}`;
    return this.http.put<ProntuarioMedicamento>(url, prontuario);
  }

  excluir(id: String): Observable<void>{
    const url=`${this.baseUrl}/prontuariosMedicamentosRest/${id}`;
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
