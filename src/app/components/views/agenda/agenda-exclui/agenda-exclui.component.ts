import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Agenda } from '../agenda.model';
import { AgendaService } from '../agenda.service';
import { AgendaLista } from '../agendaLista.model';
import { ChavePesquisa } from "../chavePesquisa.model";

@Component({
  selector: 'app-agenda-exclui',
  templateUrl: './agenda-exclui.component.html',
  styleUrls: ['./agenda-exclui.component.css']
})
export class AgendaExcluiComponent implements OnInit {

  agenda: AgendaLista =   {   
    dataAgenda: new Date(),
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
    codigoTipo: 0
  };

  chavePesquisa: ChavePesquisa = {
    anoData: 0,
    mesData: 0,
    diaData: 0,
    horaData: 0,
    minutoData: 0,
    segundoData: 0
  };
  dataAgendaStr: string ='';

  constructor(
    private service: AgendaService, 
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
   this.agenda.id = JSON.parse(this.route.snapshot.paramMap.get('id')!);
   this.buscarAgendaParaExcluir();
  }

  buscarAgendaParaExcluir(): void {
/*    const d1 = new Date(this.agenda.chaveCompostaAgenda.dataAgenda);
    this.agenda.chaveCompostaAgenda.dataAgenda=d1;
    this.chavePesquisa.codigoMedicoId=this.agenda.chaveCompostaAgenda.codigoMedicoId;
    this.chavePesquisa.anoData=d1.getFullYear();
    this.chavePesquisa.mesData=d1.getMonth();
    this.chavePesquisa.diaData=d1.getDate();
    this.chavePesquisa.horaData=d1.getHours();
    this.chavePesquisa.minutoData=d1.getMinutes();
    this.chavePesquisa.segundoData=d1.getSeconds();
    this.agenda.chaveCompostaAgenda = JSON.parse(this.route.snapshot.paramMap.get('id')!);
    this.service.pesquisarPorChaveComposta(JSON.stringify(this.chavePesquisa)).subscribe((resposta) => {
*/
    this.service.pesquisarPorId(this.agenda.id!).subscribe((resposta) => {
    this.agenda = resposta;
    this.dataAgendaStr = this.formataData(this.agenda.dataAgenda);
    console.log(this.agenda.dataAgenda);
    });
  }

  excluir(): void{
    if (this.agenda.codigoSituacao !== 1 && this.agenda.codigoSituacao !== 2) 
    {
      this.service.mensagem('Situação não permite exlusão.');
      return;
    }
    this.agenda.codigoSituacao = 3;
    this.service.editar(this.agenda.id!, this.agenda).subscribe((resposta) => {
//    this.service.excluir(this.agenda.id!).subscribe((resposta) => {
      this.router.navigate(["agendas"]);
      this.service.mensagem('Agenda excluída com sucesso.');
    },
    err =>{   
      this.service.mensagem(err.error.message);
    }     
    );
  }

  public formataData(dataReceb: Date){
    let dataRecebida : string = dataReceb.toString(); 
    let dataFormat = dataRecebida.substring(8,10) + '/' + dataRecebida.substring(5,7) + '/' + dataRecebida.substring(0,4) + ' ' + dataRecebida.substring(11,16);
    return dataFormat;    
  }

  voltar(): void{
    this.router.navigate(["agendas"]);
  }
}
