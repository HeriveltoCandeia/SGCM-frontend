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
  dataAtual: Date = new Date();
  dataAgendaP: Date = new Date();
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
      cliente: [''],
      codigoSituacao: [''],
      codigoTipo: ['', Validators.required],
      horaAgenda: ['', Validators.required],
      dataReg:[''],
      dataAgendaP:['']
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

  ajustaData(){
    this.agenda.dataAgenda.setSeconds(0); 
    this.formulario.get("dataAgenda")?.setValue(this.agenda.dataAgenda); 
  }
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

  defineDatePicker(){
    this.agenda.dataAgenda = this.formulario.get("dataAgenda")?.value; 
    let dTString = this.formataDataInserir(this.agenda.dataAgenda.toString());
    console.log(dTString);
    let dTDate : Date = new Date(dTString);
    this.formulario.get("DataAgendaP")?.setValue(dTDate);
    this.dataAgendaP = this.agenda.dataAgenda;
  }

  incluir(): void{

    this.agenda.medico.id = this.formulario.get("codigoMedicoId")?.value;
    this.agenda.dataAgenda = this.formulario.get("dataAgenda")?.value; 
    let horaInformada = this.formulario.get("horaAgenda")?.value; 
    let minutos : number = parseInt(horaInformada.toString().substring(3,5));
    let horas : number = parseInt(horaInformada.toString().substring(0,2));
    this.agenda.dataAgenda.setHours(horas);
    this.agenda.dataAgenda.setMinutes(minutos);
    this.agenda.dataAgenda.setSeconds(0);
    console.log(this.agenda.dataAgenda);
/*    let dTString = this.formataDataInserir(this.agenda.dataAgenda.toString());
    console.log(dTString);
    let dTDate : Date = new Date(dTString);
    console.log(dTDate);
    console.log(typeof this.agenda.dataAgenda);
    console.log(this.agenda.dataAgenda);
    this.agenda.dataAgenda = dTDate;
*/
/*
    let datAgenda = this.agenda.dataAgenda;
    if (datAgenda.getTime() < this.dataAtual.getTime())
    {
      this.service.mensagem("Data e Horário já ultrapassados. Não permite inclusão.");
      return;
    }
*/
    this.agenda.cliente.id = '0';
    this.agenda.codigoTipo=parseInt(this.formulario.get("codigoTipo")?.value);
    this.agenda.codigoSituacao = 1;

    if (this.agenda.dataAgenda.getTime() < this.dataAtual.getTime())
    {
      this.service.mensagem("Data e Horário já ultrapassados. Não permite incluir essa agenda.");
      return;
    }
    
    console.log(this.agenda.dataAgenda.getMinutes());
    if(this.agenda.dataAgenda.getHours() < 8 || this.agenda.dataAgenda.getHours() >= 18 || (this.agenda.dataAgenda.getHours() >= 17 && this.agenda.dataAgenda.getMinutes() > 30))
    {
      this.service.mensagem("Hora permitido apenas entre 08:00 e 17:30");
      return;
    }
// Ajuste Hora Timezone - para armazenar na hora correta.
    this.agenda.dataAgenda.setHours(this.agenda.dataAgenda.getHours() - (this.agenda.dataAgenda.getTimezoneOffset()/60));
    this.agenda.dataAgenda.setSeconds(0);
    this.agenda.dataReg=this.agenda.dataAgenda;
    console.log(this.agenda.dataReg);
    this.service.incluir(this.agenda).subscribe((resposta) => {
      this.router.navigate(["agendas"]);
      this.service.mensagem("Agenda incluída com sucesso!");
    },err =>{
        if (err.error.message === "" )
        {
          this.service.mensagem("Ação não permitida. Informação já existente ou inconsistente.");
        }
        else
        {
          this.service.mensagem(err.error.message);
        }
    })
  }

  cancelar(){
    this.router.navigate(["agendas"]);
  }

}
