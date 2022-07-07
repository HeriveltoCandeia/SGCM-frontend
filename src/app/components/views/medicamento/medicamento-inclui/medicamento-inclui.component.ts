import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Medicamento } from '../medicamento.model';
import { MedicamentoService } from '../medicamento.service';

@Component({
  selector: 'app-medicamento-inclui',
  templateUrl: './medicamento-inclui.component.html',
  styleUrls: ['./medicamento-inclui.component.css']
})
export class MedicamentoIncluiComponent implements OnInit {

  medicamento: Medicamento = {
    descricao:''
  }

  constructor(private router:Router, private service: MedicamentoService) { }

  ngOnInit(): void {
  }

  incluir(): void{
    this.service.incluir(this.medicamento).subscribe((resposta) => {
      this.router.navigate(["medicamentos"]);
      this.service.mensagem("Medicamento incluído com sucesso!");
    },err =>{   
        this.service.mensagem(err.error.message);
    })
  }

  cancelar(){
    this.router.navigate(["medicamentos"]);
  }

}
