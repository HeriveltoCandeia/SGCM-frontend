import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Exame } from '../exame.model';
import { ExameService } from '../exame.service';
import { TipoExame } from '../tipoExame.model';

@Component({
  selector: 'app-exame-edita',
  templateUrl: './exame-edita.component.html',
  styleUrls: ['./exame-edita.component.css']
})
export class ExameEditaComponent implements OnInit {

  tipoExame: TipoExame = {
    id: 0,
    descricao: ''
  }
  exame: Exame = {
    descricao:'',
    tipoExame: this.tipoExame
  }

  constructor(
    private router: Router, 
    private service: ExameService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.exame.id = this.route.snapshot.paramMap.get('id')!;
    this.buscarExameParaAlterar();
  }

  buscarExameParaAlterar(): void {
    this.service.pesquisarPorId(this.exame.id!).subscribe((resposta) => {
      this.exame = resposta;
    });
  }

  editar(): void{
    this.service.editar(this.exame.id!, this.exame).subscribe((resposta) => {
      this.router.navigate(["exames"]);
      this.service.mensagem("Exame alterado com sucesso!");
    },err =>{   
        this.service.mensagem(err.error.message);
    })
  }

  cancelar(){
    this.router.navigate(["exames"]);
  }

}
