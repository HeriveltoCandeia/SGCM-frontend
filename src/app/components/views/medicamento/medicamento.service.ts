import { ListKeyManager } from '@angular/cdk/a11y';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Medicamento } from './medicamento.model' 

@Injectable({
  providedIn: 'root'
})
export class MedicamentoService {

  baseUrl: String = environment.baseUrl;
  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

  pesquisarTodos():Observable<Medicamento[]>{
    const url = `${this.baseUrl}/medicamentosRest`
    return this.http.get<Medicamento[]>(url);
  }

  pesquisarPorId(id: String): Observable<Medicamento>{
    const url = `${this.baseUrl}/medicamentosRest/${id}`
    return this.http.get<Medicamento>(url);
  }

  incluir(medicamento: Medicamento):Observable<Medicamento>{
    const url=`${this.baseUrl}/medicamentosRest`;
    console.log(medicamento);
    return this.http.post<Medicamento>(url, medicamento);
  }

  editar(id: String, medicamento: Medicamento):Observable<Medicamento>{
    const url=`${this.baseUrl}/medicamentosRest/${id}`;
    return this.http.put<Medicamento>(url, medicamento);
  }

  excluir(id: String): Observable<void>{
    const url=`${this.baseUrl}/medicamentosRest/${id}`;
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
