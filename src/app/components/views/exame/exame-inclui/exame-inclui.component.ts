import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Exame } from '../exame.model';
import { ExameService } from '../exame.service';
import { TipoExame } from '../tipoExame.model';

@Component({
  selector: 'app-exame-inclui',
  templateUrl: './exame-inclui.component.html',
  styleUrls: ['./exame-inclui.component.css']
})
export class ExameIncluiComponent implements OnInit {
  codigoTipoExameSelecionado = "2";
  tiposExames: TipoExame[] = [];

  tipoExame: TipoExame = {
    id: 0,
    descricao: 'teste'
  }
  exame: Exame = {
    descricao:'',
    tipoExame: this.tipoExame
  }

  constructor(private router:Router, private service: ExameService) { }

  ngOnInit(): void {
    this.service.pesquisarTiposExames().subscribe((resposta) => {
        this.tiposExames = resposta;
    },err =>{   
        this.service.mensagem(err.error.message);
    })
  }

  incluir(): void{
    this.exame.tipoExame.id= parseInt(this.codigoTipoExameSelecionado);
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
