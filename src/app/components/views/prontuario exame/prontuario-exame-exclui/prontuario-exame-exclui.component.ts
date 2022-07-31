import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProntuarioExameService } from '../prontuario-exame.service';
import { ProntuarioExame } from '../prontuario-exame.model';
import { ChavePesquisa } from "../chavePesquisa.model";

@Component({
  selector: 'app-prontuario-exame-exclui',
  templateUrl: './prontuario-exame-exclui.component.html',
  styleUrls: ['./prontuario-exame-exclui.component.css']
})
export class ProntuarioExameExcluiComponent implements OnInit {

  prontuarioExame: ProntuarioExame =   {   
    prontuarioMedico: 
    {
        id: '',
    },
    exame:
    {
        id: '',
        descricao: ''
    },
    codigoSituacao: 0,
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
    private service: ProntuarioExameService, 
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
   this.prontuarioExame.id = JSON.parse(this.route.snapshot.paramMap.get('id')!);
   this.buscarProntuarioExameParaExcluir();
  }

  buscarProntuarioExameParaExcluir(): void {
    this.service.pesquisarPorId(this.prontuarioExame.id!).subscribe((resposta) => {
    this.prontuarioExame = resposta;
//    this.dataTimeView = this.formataDataTime(this.prontuarioExame.dataTimeProntuario);
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
    this.service.excluir(this.prontuarioExame.id!).subscribe((resposta) => {
      this.router.navigate(["prontuariosExames"]);
      this.service.mensagem('Medicamento excluído com sucesso.');
    },
    err =>{   
      this.service.mensagem(err.error.message);
    }     
    );
  }

  voltar(): void{
    this.router.navigate(["prontuariosExames"]);
  }
}
