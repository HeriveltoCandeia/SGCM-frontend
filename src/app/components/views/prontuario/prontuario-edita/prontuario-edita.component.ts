import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProntuarioService } from '../prontuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { __values } from 'tslib';
import { Funcionario } from '../../funcionario/funcionario.model';
import { Cliente } from '../../cliente/cliente.model';
import { ClienteService } from '../../cliente/cliente.service';
import { FuncionarioService } from '../../funcionario/funcionario.service';
import { Prontuario } from '../prontuario.model';

@Component({
  selector: 'app-prontuario-edita',
  templateUrl: './prontuario-edita.component.html',
  styleUrls: ['./prontuario-edita.component.css']
})
export class ProntuarioEditaComponent implements OnInit {
  clientes: Cliente[] = [];
  medicos: Funcionario[] = [];
  codigoTipo='';
  codigoSituacao='';

  dataAtual!: Date ;

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

    formulario!: FormGroup;

  constructor(
    private router: Router, 
    private service: ProntuarioService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private serviceCli: ClienteService,
    private serviceFunc: FuncionarioService    
    ) { }

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
    this.prontuario.id = JSON.parse(this.route.snapshot.paramMap.get('id')!);
    this.buscarProntuarioParaAlterar();
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


  buscarProntuarioParaAlterar(): void {
    this.service.pesquisarPorId(this.prontuario.id!).subscribe((resposta) => {
      this.prontuario = resposta;
      this.formulario.get("codigoMedicoId")?.setValue(this.prontuario.medico.id);
      this.formulario.get("codigoClienteId")?.setValue(this.prontuario.cliente.id);
      this.formulario.get("orientacoes")?.setValue(this.prontuario.orientacoes);
    });
  }


  alterarProntuarioParaSalvar(): void {
    this.prontuario.medico.id = this.formulario.get("codigoMedicoId")?.value;
    this.prontuario.cliente.id = this.formulario.get("codigoClienteId")?.value;
    this.prontuario.orientacoes = this.formulario.get("orientacoes")?.value;
    console.log(this.prontuario);
  }

  editar(): void{
    this.alterarProntuarioParaSalvar();
    this.service.editar(this.prontuario.id!, this.prontuario).subscribe((resposta) => {
//      this.router.navigate(["prontuarios"]);
      this.service.mensagem("Prontuario alterado com sucesso!");
    },err =>{   
        this.service.mensagem(err.error.message);
    })
  }

  cancelar(){
    this.router.navigate(["prontuarios"]);
  }

}
