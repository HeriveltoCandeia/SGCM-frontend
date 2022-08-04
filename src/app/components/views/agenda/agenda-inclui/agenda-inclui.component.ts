import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  agenda: AgendaLista =  {
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
  codigoTipo='';
  codigoSituacao='';
  clientes: Cliente[] = [];
  medicos: Funcionario[] = [];
  formulario!: FormGroup;

  constructor(
    private router:Router, 
    private service: AgendaService,
    private serviceCli: ClienteService,
    private fb: FormBuilder,
    private serviceFunc: FuncionarioService) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      id:[''],
      codigoMedicoId:['', Validators.required],
      dataAgenda: ['', Validators.required],
      cliente: ['', Validators.required],
      codigoSituacao: ['', Validators.required],
      codigoTipo: ['', Validators.required],
      dataReg:['']
    })

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
    this.agenda.medico.id = this.formulario.get("codigoMedicoId")?.value;
    this.agenda.dataAgenda = this.formulario.get("dataAgenda")?.value;
    this.agenda.cliente.id = this.formulario.get("cliente")?.value;
    this.agenda.codigoTipo=parseInt(this.formulario.get("codigoTipo")?.value);
    this.agenda.codigoSituacao=parseInt(this.formulario.get("codigoSituacao")?.value);
    this.agenda.dataReg=this.formulario.get("dataAgenda")?.value;
    console.log(this.agenda);
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
