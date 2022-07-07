import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Medicamento } from '../medicamento.model';
import { MedicamentoService } from '../medicamento.service';

@Component({
  selector: 'app-medicamento-lista',
  templateUrl: './medicamento-lista.component.html',
  styleUrls: ['./medicamento-lista.component.css']
})
export class MedicamentoListaComponent implements OnInit {

  medicamentos: Medicamento[] = [];

  displayedColumns: string[] = ['id', 'descricao', 'acoes'];

  constructor( private service: MedicamentoService, private router:Router) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll(){
    this.service.pesquisarTodos().subscribe(resposta =>{
      this.medicamentos = resposta
    });
  }

  incluirMedicamento(){
    this.router.navigate(["medicamentos/inclui"]);
  }

  excluirMedicamento(){
}
}