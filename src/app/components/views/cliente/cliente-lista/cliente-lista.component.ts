import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css']
})
export class ClienteListaComponent implements OnInit {

  clientes: Cliente[] = [];

  displayedColumns: string[] = ['id', 'descricao', 'acoes'];

  constructor( private service: ClienteService, private router:Router) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll(){
    this.service.pesquisarTodos().subscribe(resposta =>{
      this.clientes = resposta
    });
  }

  incluirCliente(){
    this.router.navigate(["clientes/inclui"]);
  }

  excluirCliente(){
}
}