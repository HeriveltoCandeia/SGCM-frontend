import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '../../cliente/cliente.model';
import { ClienteService } from '../../cliente/cliente.service';
import { Funcionario } from '../../funcionario/funcionario.model';
import { FuncionarioService } from '../../funcionario/funcionario.service';
import { Agenda } from '../agenda.model';
import { AgendaService } from '../agenda.service';
import { AgendaLista } from '../agendaLista.model';

@Component({
  selector: 'app-agenda-inclui',
  templateUrl: './agenda-inclui.component.html',
  styleUrls: ['./agenda-inclui.component.css']
})
export class AgendaIncluiComponent implements OnInit {
  dateAtual: Date = new Date();
  agenda: AgendaLista =  {   chaveCompostaAgenda: 
  {
      codigoMedicoId: '',
      dataAgenda: new Date()
  },
  cliente: 
  {
      id: '',
      nome:''
  },
  codigoSituacao: 0,
  codigoTipo: 0
};
  codigoTipo='';
  codigoSituacao='';
  clientes: Cliente[] = [];
  medicos: Funcionario[] = [];

  constructor(
    private router:Router, 
    private service: AgendaService,
    private serviceCli: ClienteService,
    private serviceFunc: FuncionarioService) { }

  ngOnInit(): void {
    this.buscarClientes();
    this.buscarMedicos();
  }

  buscarClientes(){
    this.serviceCli.pesquisarTodos().subscribe((resposta) => {
        this.clientes = resposta;
    },err =>{   
        this.service.mensagem(err.error.message);
    })
  }

  buscarMedicos(){
    this.serviceFunc.pesquisarPorCargo("3").subscribe((resposta) => {
        this.medicos = resposta;
    },err =>{   
        this.service.mensagem(err.error.message);
    })
  }

  incluir(): void{
    console.log('this.agenda');
    console.log(this.agenda);
    this.agenda.codigoTipo=parseInt(this.codigoTipo);
    this.agenda.codigoSituacao=parseInt(this.codigoSituacao);
    this.service.incluir(this.agenda).subscribe((resposta) => {
      this.router.navigate(["agendas"]);
      this.service.mensagem("Agenda incluído com sucesso!");
    },err =>{
        console.log('err.error: ');   
        console.log(err.error);   
        console.log('err.error.message: ');   
        console.log(err.error.message);   
        this.service.mensagem(err.error.message);
    })
  }

  cancelar(){
    this.router.navigate(["agendas"]);
  }

}
