import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Exame } from '../exame.model';
import { ExameService } from '../exame.service';
import { TipoExame } from '../tipoExame.model';

@Component({
  selector: 'app-exame-exclui',
  templateUrl: './exame-exclui.component.html',
  styleUrls: ['./exame-exclui.component.css']
})
export class ExameExcluiComponent implements OnInit {

  tipoExame: TipoExame = {
    id: 0,
    descricao: ''
  }
  exame: Exame = {
    descricao:'',
    tipoExame: this.tipoExame
  }

  constructor(
    private service: ExameService, 
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
   this.exame.id = this.route.snapshot.paramMap.get('id')!;
   this.buscarExameParaExcluir();
  }

  buscarExameParaExcluir(): void {
    this.service.pesquisarPorId(this.exame.id!).subscribe((resposta) => {
      this.exame = resposta;
    });
  }

  excluir(): void{
    this.service.excluir(this.exame.id!).subscribe((resposta) => {
      this.router.navigate(["exames"]);
      this.service.mensagem('Exame excluído com sucesso.');
    },
    err =>{   
      this.service.mensagem(err.error.message);
    }     
    );
  }

  voltar(): void{
    this.router.navigate(["exames"]);
  }
}
