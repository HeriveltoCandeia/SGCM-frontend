import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../../cliente/cliente.model';
import { ClienteService } from '../../cliente/cliente.service';
import { Funcionario } from '../../funcionario/funcionario.model';
import { FuncionarioService } from '../../funcionario/funcionario.service';
import { ProntuarioExameService } from '../prontuario-exame.service';
import { ProntuarioExame } from '../prontuario-exame.model';
import { ExameService } from '../../exame/exame.service';
import { Exame } from '../../exame/exame.model';

@Component({
  selector: 'app-prontuario-exame-inclui',
  templateUrl: './prontuario-exame-inclui.component.html',
  styleUrls: ['./prontuario-exame-inclui.component.css']
})
export class ProntuarioExameIncluiComponent implements OnInit {
  dataAtual: Date = new Date();
  prontuarioExame: ProntuarioExame =  {   
    prontuarioMedico: 
    {
        id: ''
    },
    exame: 
    {
        id: '',
        descricao:''
    },
    codigoSituacao:0

  };
  codigoTipo='';
  codigoSituacao='';
  clientes: Cliente[] = [];
  exames: Exame[] = [];
  formulario!: FormGroup;
  prontuarioOrigem = '';

  constructor(
    private router:Router, 
    private service: ProntuarioExameService,
    private route: ActivatedRoute,
    private serviceCli: ClienteService,
    private fb: FormBuilder,
    private serviceFunc: ExameService) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      id:[''],
      codigoProntuarioId:['', Validators.required],
      codigoExameId:['', Validators.required],
      codigoSituacao:[''],
      orientacoes: [''],
    })
    this.prontuarioOrigem = JSON.parse(this.route.snapshot.paramMap.get('id')!);
    this.buscarExames();
  }

  buscarExames(){
    this.serviceFunc.pesquisarTodos().subscribe((resposta) => {
        this.exames = resposta;
    },err =>{   
        this.service.mensagem(err.error.message);
    })
  }

  incluir(): void{
//    this.prontuario.prontuarioMedico.id = this.formulario.get("codigoMedicoId")?.value;
    this.prontuarioExame.prontuarioMedico.id = this.prontuarioOrigem;
    this.prontuarioExame.exame.id = this.formulario.get("codigoExameId")?.value;
    this.prontuarioExame.codigoSituacao = 1;
    //this.prontuario.orientacoes = this.formulario.get("orientacoes")?.value;
    console.log(this.prontuarioExame);
    this.service.incluir(this.prontuarioExame).subscribe((resposta) => {
      let irParaEdicao : string = "prontuarios/edita/" + this.prontuarioOrigem;
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

