import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Funcionario } from '../funcionario.model';
import { FuncionarioService } from '../funcionario.service';

@Component({
  selector: 'app-funcionario-lista',
  templateUrl: './funcionario-lista.component.html',
  styleUrls: ['./funcionario-lista.component.css']
})
export class FuncionarioListaComponent implements OnInit {

  funcionarios: Funcionario[] = [];

  displayedColumns: string[] = ['id', 'descricao', 'acoes'];

  constructor( private service: FuncionarioService, private router:Router) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll(){
    this.service.pesquisarTodos().subscribe(resposta =>{
      this.funcionarios = resposta
    });
  }

  incluirFuncionario(){
    this.router.navigate(["funcionarios/inclui"]);
  }

  excluirFuncionario(){
}
}