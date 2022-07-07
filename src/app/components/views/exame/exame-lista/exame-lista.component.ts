import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Exame } from '../exame.model';
import { ExameService } from '../exame.service';

@Component({
  selector: 'app-exame-lista',
  templateUrl: './exame-lista.component.html',
  styleUrls: ['./exame-lista.component.css']
})
export class ExameListaComponent implements OnInit {

  exames: Exame[] = [];

  displayedColumns: string[] = ['id', 'descricao', 'acoes'];

  constructor( private service: ExameService, private router:Router) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll(){
    this.service.pesquisarTodos().subscribe(resposta =>{
      this.exames = resposta
    });
  }

  incluirExame(){
    this.router.navigate(["exames/inclui"]);
  }

  excluirExame(){
}
}