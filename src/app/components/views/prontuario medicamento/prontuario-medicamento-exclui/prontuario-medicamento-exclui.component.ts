import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProntuarioMedicamentoService } from '../prontuario-medicamento.service';
import { ProntuarioMedicamento } from '../prontuario-medicamento.model';
import { ChavePesquisa } from "../chavePesquisa.model";

@Component({
  selector: 'app-prontuario-medicamento-exclui',
  templateUrl: './prontuario-medicamento-exclui.component.html',
  styleUrls: ['./prontuario-medicamento-exclui.component.css']
})
export class ProntuarioMedicamentoExcluiComponent implements OnInit {

  prontuarioMedicamento: ProntuarioMedicamento =   {   
    prontuarioMedico: 
    {
        id: '',
    },
    medicamento:
    {
        id: '',
        nomeFabrica: ''
    },
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
  prontuarioOrigem = '';
  constructor(
    private service: ProntuarioMedicamentoService, 
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
   this.prontuarioMedicamento.id = JSON.parse(this.route.snapshot.paramMap.get('id2')!);
   this.prontuarioOrigem = JSON.parse(this.route.snapshot.paramMap.get('id')!);
   this.buscarProntuarioMedicamentoParaExcluir();
  }

  buscarProntuarioMedicamentoParaExcluir(): void {
    this.service.pesquisarPorId(this.prontuarioMedicamento.id!).subscribe((resposta) => {
    this.prontuarioMedicamento = resposta;
//    this.dataTimeView = this.formataDataTime(this.prontuarioMedicamento.dataTimeProntuario);
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
    this.service.excluir(this.prontuarioMedicamento.id!).subscribe((resposta) => {
      let irParaEdicao : string = "prontuarios/edita/" + this.prontuarioOrigem;
      this.router.navigate([irParaEdicao]);
        this.service.mensagem('Medicamento excluído do prontuário com sucesso.');
    },
    err =>{   
      this.service.mensagem(err.error.message);
    }     
    );
  }

  voltar(): void{
    let irParaEdicao : string = "prontuarios/edita/" + this.prontuarioOrigem;
    this.router.navigate([irParaEdicao]);

  }
}
