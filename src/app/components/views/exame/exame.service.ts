import { ListKeyManager } from '@angular/cdk/a11y';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Exame } from './exame.model' 

@Injectable({
  providedIn: 'root'
})
export class ExameService {

  baseUrl: String = environment.baseUrl;
  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

  pesquisarTodos():Observable<Exame[]>{
    const url = `${this.baseUrl}/examesRest`
    return this.http.get<Exame[]>(url);
  }

  pesquisarPorId(id: String): Observable<Exame>{
    const url = `${this.baseUrl}/examesRest/${id}`
    return this.http.get<Exame>(url);
  }

  incluir(exame: Exame):Observable<Exame>{
    const url=`${this.baseUrl}/examesRest`;
    return this.http.post<Exame>(url, exame);
  }

  editar(id: String, exame: Exame):Observable<Exame>{
    const url=`${this.baseUrl}/examesRest/${id}`;
    return this.http.put<Exame>(url, exame);
  }

  excluir(id: String): Observable<void>{
    const url=`${this.baseUrl}/examesRest/${id}`;
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
