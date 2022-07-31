import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Prontuario } from '../prontuario.model';
import { ProntuarioService } from '../prontuario.service';
import { ProntuarioLista } from '../prontuarioLista.model';
import { ChavePesquisa } from "../chavePesquisa.model";

@Component({
  selector: 'app-prontuario-exclui',
  templateUrl: './prontuario-exclui.component.html',
  styleUrls: ['./prontuario-exclui.component.css']
})
export class ProntuarioExcluiComponent implements OnInit {

  prontuario: ProntuarioLista =   {   
    chaveCompostaProntuario: 
    {
        codigoMedicoId: '',
        dataProntuario: new Date()
    },
    cliente: 
    {
        id: '',
        nome:''
    },
    codigoSituacao: 0,
    codigoTipo: 0
  };

  chavePesquisa: ChavePesquisa = {
    codigoMedicoId: '',
    anoData: 0,
    mesData: 0,
    diaData: 0,
    horaData: 0,
    minutoData: 0,
    segundoData: 0
  };

  constructor(
    private service: ProntuarioService, 
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
   this.prontuario.id = JSON.parse(this.route.snapshot.paramMap.get('id')!);
   console.log(this.prontuario.chaveCompostaProntuario);
   this.buscarProntuarioParaExcluir();
  }

  buscarProntuarioParaExcluir(): void {
/*    const d1 = new Date(this.prontuario.chaveCompostaProntuario.dataProntuario);
    this.prontuario.chaveCompostaProntuario.dataProntuario=d1;
    this.chavePesquisa.codigoMedicoId=this.prontuario.chaveCompostaProntuario.codigoMedicoId;
    this.chavePesquisa.anoData=d1.getFullYear();
    this.chavePesquisa.mesData=d1.getMonth();
    this.chavePesquisa.diaData=d1.getDate();
    this.chavePesquisa.horaData=d1.getHours();
    this.chavePesquisa.minutoData=d1.getMinutes();
    this.chavePesquisa.segundoData=d1.getSeconds();
    this.prontuario.chaveCompostaProntuario = JSON.parse(this.route.snapshot.paramMap.get('id')!);
    this.service.pesquisarPorChaveComposta(JSON.stringify(this.chavePesquisa)).subscribe((resposta) => {
*/
    this.service.pesquisarPorId(this.prontuario.id!).subscribe((resposta) => {
    this.prontuario = resposta;
    });
  }

  excluir(): void{
    this.service.excluir(this.prontuario.id!).subscribe((resposta) => {
      this.router.navigate(["prontuarios"]);
      this.service.mensagem('Prontuario excluído com sucesso.');
    },
    err =>{   
      this.service.mensagem(err.error.message);
    }     
    );
  }

  voltar(): void{
    this.router.navigate(["prontuarios"]);
  }
}
