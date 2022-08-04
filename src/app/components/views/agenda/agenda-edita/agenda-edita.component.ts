import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Agenda } from '../agenda.model';
import { AgendaService } from '../agenda.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { __values } from 'tslib';
import { AgendaLista } from '../agendaLista.model';
import { Funcionario } from '../../funcionario/funcionario.model';
import { Cliente } from '../../cliente/cliente.model';
import { ClienteService } from '../../cliente/cliente.service';
import { FuncionarioService } from '../../funcionario/funcionario.service';
import { AgendaListaComponent } from '../agenda-lista/agenda-lista.component';

@Component({
  selector: 'app-agenda-edita',
  templateUrl: './agenda-edita.component.html',
  styleUrls: ['./agenda-edita.component.css']
})
export class AgendaEditaComponent implements OnInit {
  clientes: Cliente[] = [];
  medicos: Funcionario[] = [];
  codigoTipo='';
  codigoSituacao='';

  dataAtual!: Date ;

  agenda: AgendaLista =  {
      id: '',
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
      codigoTipo: 0,
      dataReg: ''
    };

    formulario!: FormGroup;

  constructor(
    private router: Router, 
    private service: AgendaService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private serviceCli: ClienteService,
    private serviceFunc: FuncionarioService    
    ) { }

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
    this.agenda.id = JSON.parse(this.route.snapshot.paramMap.get('id')!);
    this.buscarAgendaParaAlterar();
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


  buscarAgendaParaAlterar(): void {
    this.service.pesquisarPorId(this.agenda.id!).subscribe((resposta) => {
      this.agenda = resposta;
      this.formulario.get("codigoMedicoId")?.setValue(this.agenda.medico.id);
      this.formulario.get("dataAgenda")?.setValue(this.agenda.dataAgenda);
      this.formulario.get("cliente")?.setValue(this.agenda.cliente.id);
      this.formulario.get("codigoSituacao")?.setValue(this.agenda.codigoSituacao.toString());
      this.formulario.get("codigoTipo")?.setValue(this.agenda.codigoTipo.toString());

    });
  }


  alterarAgendaParaSalvar(): void {
    this.agenda.medico.id = this.formulario.get("codigoMedicoId")?.value;
    this.agenda.dataAgenda = this.formulario.get("dataAgenda")?.value;
    this.agenda.cliente.id = this.formulario.get("cliente")?.value;
    this.agenda.codigoSituacao = this.formulario.get("codigoSituacao")?.value;
    this.agenda.codigoTipo = this.formulario.get("codigoTipo")?.value;
    console.log(this.agenda);
  }

  editar(): void{
    this.alterarAgendaParaSalvar();
    this.service.editar(this.agenda.id!, this.agenda).subscribe((resposta) => {
      this.router.navigate(["agendas"]);
      this.service.mensagem("Agenda alterado com sucesso!");
    },err =>{   
        this.service.mensagem(err.error.message);
    })
  }

  cancelar(){
    this.router.navigate(["agendas"]);
  }

}
