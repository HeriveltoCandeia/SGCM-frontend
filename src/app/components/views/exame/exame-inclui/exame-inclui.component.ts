import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Exame } from '../exame.model';
import { ExameService } from '../exame.service';

@Component({
  selector: 'app-exame-inclui',
  templateUrl: './exame-inclui.component.html',
  styleUrls: ['./exame-inclui.component.css']
})
export class ExameIncluiComponent implements OnInit {

  exame: Exame = {
    descricao:''
  }

  constructor(private router:Router, private service: ExameService) { }

  ngOnInit(): void {
  }

  incluir(): void{
    this.service.incluir(this.exame).subscribe((resposta) => {
      this.router.navigate(["exames"]);
      this.service.mensagem("Exame incluído com sucesso!");
    },err =>{   
        this.service.mensagem(err.error.message);
    })
  }

  cancelar(){
    this.router.navigate(["exames"]);
  }

}
