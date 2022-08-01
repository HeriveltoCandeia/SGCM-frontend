import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from '../../cliente/cliente.model';
import { ClienteService } from '../../cliente/cliente.service';
import { Funcionario } from '../../funcionario/funcionario.model';
import { FuncionarioService } from '../../funcionario/funcionario.service';
import { ProntuarioService } from '../prontuario.service';
import { Prontuario } from '../prontuario.model';

@Component({
  selector: 'app-prontuario-inclui',
  templateUrl: './prontuario-inclui.component.html',
  styleUrls: ['./prontuario-inclui.component.css']
})
export class ProntuarioIncluiComponent implements OnInit {
  dataAtual: Date = new Date();
  prontuario: Prontuario =  {   
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
  codigoTipo='';
  codigoSituacao='';
  clientes: Cliente[] = [];
  medicos: Funcionario[] = [];
  formulario!: FormGroup;

  constructor(
    private router:Router, 
    private service: ProntuarioService,
    private serviceCli: ClienteService,
    private fb: FormBuilder,
    private serviceFunc: FuncionarioService) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      id:[''],
      dataTimeProntuario:[''],
      codigoMedicoId:['', Validators.required],
      codigoClienteId:['', Validators.required],
      codigoSituacao: ['', Validators.required],
      dataReg: [''],
      orientacoes: [''],
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
    this.prontuario.medico.id = this.formulario.get("codigoMedicoId")?.value;
    this.prontuario.cliente.id = this.formulario.get("codigoClienteId")?.value;
    this.prontuario.orientacoes = this.formulario.get("orientacoes")?.value;
    this.prontuario.codigoSituacao = 1;
    this.prontuario.dataReg = this.dataAtual;
    this.prontuario.dataTimeProntuario = this.dataAtual;
    this.service.incluir(this.prontuario).subscribe((resposta) => {
      let irParaEdicao : string = "prontuarios/edita/" + resposta.id;
      this.router.navigate([irParaEdicao]);
      this.service.mensagem("Prontuario incluído com sucesso!");
    },err =>{
        console.log('err.error: ');   
        console.log(err.error);   
        console.log('err.error.message: ');   
        console.log(err.error.message);   
        this.service.mensagem(err.error.message);
    })
  }

  cancelar(){
    this.router.navigate(["prontuarios"]);
  }

}
function queryParams(arg0: string[], queryParams: any) {
  throw new Error('Function not implemented.');
}

