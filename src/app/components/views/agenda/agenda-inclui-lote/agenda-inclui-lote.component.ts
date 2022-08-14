import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { timestamp } from 'rxjs';
import { Cliente } from '../../cliente/cliente.model';
import { ClienteService } from '../../cliente/cliente.service';
import { Funcionario } from '../../funcionario/funcionario.model';
import { FuncionarioService } from '../../funcionario/funcionario.service';
import { Agenda } from '../agenda.model';
import { AgendaService } from '../agenda.service';
import { AgendaLista } from '../agendaLista.model';
import { AgendaLote } from '../agendaLote.model';

@Component({
  selector: 'app-agenda-inclui-lote',
  templateUrl: './agenda-inclui-lote.component.html',
  styleUrls: ['./agenda-inclui-lote.component.css']
})
export class AgendaIncluiLoteComponent implements OnInit {
  dataAtual: Date = new Date();
  dataAgendaP: Date = new Date();
  horaAtual: Time = {hours: 8, minutes: 0};
  agenda: AgendaLote =  {
    medico: 
    {
        id: '',
        nome:''
    },
    dataInicial: new Date(),
    dataFinal: new Date(),
    horaInicial: this.horaAtual,
    horaFinal: this.horaAtual,
    codigoSituacao: 0,
    codigoTipo: 0,
    codigoTempo: 0
  };;
  agendaOld: AgendaLista =  {
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
  agendaCriada: boolean = true;

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
      dataAgenda: [''],
      cliente: [''],
      codigoTipo: ['', Validators.required],
      codigoTempo: ['', Validators.required],
      dataReg:[''],
      dataAgendaP:[''],
      dataInicial: ['', Validators.required],
      dataFinal: ['', Validators.required],
      horaInicial:  ['', Validators.required],
      horaFinal:  ['', Validators.required]
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

/*
  ajustaData(){
    this.agenda.dataAgenda.setSeconds(0); 
    this.formulario.get("dataAgenda")?.setValue(this.agenda.dataAgenda); 
  }
*/
  buscarMedicos(){
    this.serviceFunc.pesquisarPorCargo("3").subscribe((resposta) => {
        this.medicos = resposta;
    },err =>{   
        this.service.mensagem(err.error.message);
    })
  }

  public formataDataInserir(dataRecebida: string){
    let dataFormat = dataRecebida.substring(3,6) + dataRecebida.substring(0,3) + dataRecebida.substring(6,10) + ' ' + dataRecebida.substring(11,16);
    return dataFormat;    
  }
/*
  defineDatePicker(){
    this.agenda.dataAgenda = this.formulario.get("dataAgenda")?.value; 
    let dTString = this.formataDataInserir(this.agenda.dataAgenda.toString());
    console.log(dTString);
    let dTDate : Date = new Date(dTString);
    this.formulario.get("DataAgendaP")?.setValue(dTDate);
    this.dataAgendaP = this.agenda.dataAgenda;
  }
*/
  incluir(): void{

    this.agenda.medico.id = this.formulario.get("codigoMedicoId")?.value;
    this.agenda.dataInicial = this.formulario.get("dataInicial")?.value; 
    this.agenda.dataFinal = this.formulario.get("dataFinal")?.value; 
    this.agenda.horaInicial = this.formulario.get("horaInicial")?.value; 
    console.log(this.formulario.get("horaInicial"));
    console.log(this.formulario.get("horaInicial")?.value);

    this.agenda.horaFinal = this.formulario.get("horaFinal")?.value; 
    this.agenda.codigoTempo=parseInt(this.formulario.get("codigoTempo")?.value);

    console.log(typeof this.agenda.horaInicial);
    console.log(typeof this.agenda.horaFinal);

    /*
    let dTString = this.formataDataInserir(this.agenda.dataInicial.toString());
    console.log(dTString);
    let dTDate : Date = new Date(dTString);
    console.log(dTDate);
    console.log(typeof this.agenda.dataInicial);
    console.log(this.agenda.dataInicial);
    console.log(this.formulario.get("horaInicial")?.value);
    console.log(this.formulario.get("horaFinal")?.value);
    this.agenda.dataInicial = dTDate;
*/
/*
    let datAgenda = this.agenda.dataAgenda;
*/
    if (this.agenda.dataFinal.getTime() < this.agenda.dataInicial.getTime())
    {
      this.service.mensagem("Data Final dever ser maior ou igual à data Inicial.");
      return;
    }

    let minutos : number = parseInt(this.agenda.horaInicial.toString().substring(3,5));
    let horas : number = parseInt(this.agenda.horaInicial.toString().substring(0,2));
    minutos = minutos + this.agenda.codigoTempo;
    if (minutos>=60)
    {
      minutos = 0;
      horas = horas +1;
    }

    let minutosF : number = parseInt(this.agenda.horaFinal.toString().substring(3,5));
    let horasF : number = parseInt(this.agenda.horaFinal.toString().substring(0,2));

    let horaIniValidar : string = this.formatarHorasMinutos(horas) + ":" + this.formatarHorasMinutos(minutos);
    let horaFimValidar : string = this.formatarHorasMinutos(horasF) + ":" + this.formatarHorasMinutos(minutosF);

    console.log(horaIniValidar);
    console.log(horaFimValidar);

    if (horaFimValidar < horaIniValidar)
    {
      this.service.mensagem("Hora Final dever ser maior ou igual à hora Inicial + duração da consulta.");
      return;
    }

    this.agenda.codigoTempo=parseInt(this.formulario.get("codigoTempo")?.value);
    this.agenda.codigoTipo=parseInt(this.formulario.get("codigoTipo")?.value);
    this.agenda.codigoSituacao = 1;

    console.log("Objeto Enviado");
    console.log(this.agenda);
    this.agendaCriada=false;
    this.service.incluirLote(this.agenda).subscribe((resposta) => {
//      this.router.navigate(["agendas"]);
      this.agendaCriada=true;
      this.service.mensagem("Agenda incluída com sucesso!");
    },err =>{
        console.log('err.error: ');   
        console.log(err.error);   
        console.log('err.error.message: ');   
        console.log(err.error.message);   
        this.agendaCriada=true;
        this.service.mensagem(err.error.message);
    })
  }

  formatarHorasMinutos( entrada: number)
  {
    let ret  : string = '0';
    ret = (ret + entrada);
    if (ret.length > 2)
    {
      ret = (ret + entrada).substring(1,3);
    }
    return ret
  }
  cancelar(){
    this.router.navigate(["agendas"]);
  }

}
