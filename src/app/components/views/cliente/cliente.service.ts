import { ListKeyManager } from '@angular/cdk/a11y';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from './cliente.model' 

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  baseUrl: String = environment.baseUrl;
  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

  pesquisarTodos():Observable<Cliente[]>{
    const url = `${this.baseUrl}/clientesRest`
    return this.http.get<Cliente[]>(url);
  }

  pesquisarPorId(id: String): Observable<Cliente>{
    const url = `${this.baseUrl}/clientesRest/${id}`
    return this.http.get<Cliente>(url);
  }

  incluir(cliente: Cliente):Observable<Cliente>{
    const url=`${this.baseUrl}/clientesRest`;
    return this.http.post<Cliente>(url, cliente);
  }

  editar(id: String, cliente: Cliente):Observable<Cliente>{
    const url=`${this.baseUrl}/clientesRest/${id}`;
    return this.http.put<Cliente>(url, cliente);
  }

  excluir(id: String): Observable<void>{
    const url=`${this.baseUrl}/clientesRest/${id}`;
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
