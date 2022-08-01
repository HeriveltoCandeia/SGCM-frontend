import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProntuarioService } from '../prontuario.service';
import { Prontuario } from '../prontuario.model';
import { ChavePesquisa } from "../chavePesquisa.model";

@Component({
  selector: 'app-prontuario-exclui',
  templateUrl: './prontuario-exclui.component.html',
  styleUrls: ['./prontuario-exclui.component.css']
})
export class ProntuarioExcluiComponent implements OnInit {

  prontuario: Prontuario =   {   
    dataTimeProntuario: new Date(),
    medico: 
    {
        id: '',
        nome:''
    },
    cliente: 
    {
        id: '',
        nome:''
    },
    codigoSituacao: 0,
    dataReg: new Date(),
    orientacoes: ''
  };
  dataTimeView!: string;
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

   this.buscarProntuarioParaExcluir();
  }

  buscarProntuarioParaExcluir(): void {

    this.service.pesquisarPorId(this.prontuario.id!).subscribe((resposta) => {
    this.prontuario = resposta;
    console.log(resposta);
    this.dataTimeView = this.formataDataTime(this.prontuario.dataTimeProntuario);
    console.log(this.dataTimeView);
    });
  }

  public formataDataTime(dataConverter: Date){
    const d: Date = new Date(dataConverter);
    let dataRetorno: string;
    dataRetorno = d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
    return dataRetorno;    
  }

  public formataData(dataRecebida: String){
    let dataFormat = dataRecebida.substring(8,10) + '/' + dataRecebida.substring(5,7) + '/' + dataRecebida.substring(0,4) + ' ' + dataRecebida.substring(11,16);
    return dataFormat;    
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
