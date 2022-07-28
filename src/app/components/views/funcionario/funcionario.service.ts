import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Funcionario } from './funcionario.model' 

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  baseUrl: String = environment.baseUrl;
  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

  pesquisarTodos():Observable<Funcionario[]>{
    const url = `${this.baseUrl}/funcionariosRest`
    return this.http.get<Funcionario[]>(url);
  }

  pesquisarPorId(id: String): Observable<Funcionario>{
    const url = `${this.baseUrl}/funcionariosRest/${id}`
    return this.http.get<Funcionario>(url);
  }

  incluir(funcionario: Funcionario):Observable<Funcionario>{
    const url=`${this.baseUrl}/funcionariosRest`;
    return this.http.post<Funcionario>(url, funcionario);
  }

  editar(id: String, funcionario: Funcionario):Observable<Funcionario>{
    const url=`${this.baseUrl}/funcionariosRest/${id}`;
    return this.http.put<Funcionario>(url, funcionario);
  }

  excluir(id: String): Observable<void>{
    const url=`${this.baseUrl}/funcionariosRest/${id}`;
    return this.http.delete<void>(url);
  }

  mensagem(str: String): void{
    if(str.length>80)
    {
      this._snack.open(`${str}`,'OK',{
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration:10000
      }) 
    }
    else
    {
      this._snack.open(`${str}`,'OK',{
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration:1000
      })
    }
  }
}
