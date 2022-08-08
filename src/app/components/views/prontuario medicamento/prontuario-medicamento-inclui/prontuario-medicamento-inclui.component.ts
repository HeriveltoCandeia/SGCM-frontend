import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../../cliente/cliente.model';
import { ClienteService } from '../../cliente/cliente.service';
import { Funcionario } from '../../funcionario/funcionario.model';
import { FuncionarioService } from '../../funcionario/funcionario.service';
import { ProntuarioMedicamentoService } from '../prontuario-medicamento.service';
import { ProntuarioMedicamento } from '../prontuario-medicamento.model';
import { MedicamentoService } from '../../medicamento/medicamento.service';
import { Medicamento } from '../../medicamento/medicamento.model';

@Component({
  selector: 'app-prontuario-medicamento-inclui',
  templateUrl: './prontuario-medicamento-inclui.component.html',
  styleUrls: ['./prontuario-medicamento-inclui.component.css']
})
export class ProntuarioMedicamentoIncluiComponent implements OnInit {
  dataAtual: Date = new Date();
  prontuario: ProntuarioMedicamento =  {   
    prontuarioMedico: 
    {
        id: ''
    },
    medicamento: 
    {
        id: '',
        nomeFabrica:''
    },

  };
  codigoTipo='';
  codigoSituacao='';
  clientes: Cliente[] = [];
  medicamentos: Medicamento[] = [];
  formulario!: FormGroup;
  prontuarioOrigem = '';

  constructor(
    private router:Router, 
    private service: ProntuarioMedicamentoService,
    private route: ActivatedRoute,
    private serviceCli: ClienteService,
    private fb: FormBuilder,
    private serviceMed: MedicamentoService) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      id:[''],
      codigoProntuarioId:['', Validators.required],
      codigoMedicamentoId:['', Validators.required],
      orientacoes: [''],
    })
    this.prontuarioOrigem = JSON.parse(this.route.snapshot.paramMap.get('id')!);
    this.buscarMedicamentos();
  }

  buscarMedicamentos(){
    this.serviceMed.pesquisarTodos().subscribe((resposta) => {
        this.medicamentos = resposta;
    },err =>{   
        this.service.mensagem(err.error.message);
    })
  }

  incluir(): void{
//    this.prontuario.prontuarioMedico.id = this.formulario.get("codigoMedicoId")?.value;
    this.prontuario.prontuarioMedico.id = this.prontuarioOrigem;
    this.prontuario.medicamento.id = this.formulario.get("codigoMedicamentoId")?.value;
    this.prontuario.orientacoes = this.formulario.get("orientacoes")?.value;
    //this.prontuario.orientacoes = this.formulario.get("orientacoes")?.value;
    console.log(this.prontuario);
    this.service.incluir(this.prontuario).subscribe((resposta) => {
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
    let irParaEdicao : string = "prontuarios/edita/" + this.prontuarioOrigem;
    this.router.navigate([irParaEdicao]);
  }

}
function queryParams(arg0: string[], queryParams: any) {
  throw new Error('Function not implemented.');
}

