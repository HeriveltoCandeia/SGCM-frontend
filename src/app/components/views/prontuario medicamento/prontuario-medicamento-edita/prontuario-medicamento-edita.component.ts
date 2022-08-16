import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProntuarioMedicamentoService } from '../prontuario-medicamento.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { __values } from 'tslib';
import { Funcionario } from '../../funcionario/funcionario.model';
import { Cliente } from '../../cliente/cliente.model';
import { ClienteService } from '../../cliente/cliente.service';
import { FuncionarioService } from '../../funcionario/funcionario.service';
import { ProntuarioMedicamento } from '../prontuario-medicamento.model';
import { Medicamento } from '../../medicamento/medicamento.model';
import { MedicamentoService } from '../../medicamento/medicamento.service';
import { AuthService } from 'src/app/components/auth/auth.service';

@Component({
  selector: 'app-prontuario-medicamento-edita',
  templateUrl: './prontuario-medicamento-edita.component.html',
  styleUrls: ['./prontuario-medicamento-edita.component.css']
})
export class ProntuarioMedicamentoEditaComponent implements OnInit {
  clientes: Cliente[] = [];
  medicamentos: Medicamento[] = [];
  medicos: Funcionario[] = [];
  codigoTipo='';
  codigoSituacao='';
  prontuarioOrigem = '';
  dataAtual!: Date ;
  disabled = true;
  cargoUsuario: string='';
  idUsuario: string='';

  prontuarioMedicamento: ProntuarioMedicamento =  {
    prontuarioMedico: 
    {
        id: '',
    },
    medicamento:
    {
        id: '',
        nomeFabrica: ''
    },
    orientacoes: ''
  };

    formulario!: FormGroup;

  constructor(
    private router: Router, 
    private service: ProntuarioMedicamentoService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private serviceAuth: AuthService,
    private serviceCli: ClienteService,
    private serviceMed: MedicamentoService    
    ) { }

  ngOnInit(): void {
    this.cargoUsuario = this.serviceAuth.getCargo();
    this.idUsuario = this.serviceAuth.getIdUsuario();

    this.formulario = this.fb.group({
      id:[''],
      codigoProntuarioId:['', Validators.required],
      codigoMedicamentoId:['', Validators.required],
      orientacoes: [''],
    })
    this.prontuarioMedicamento.id = JSON.parse(this.route.snapshot.paramMap.get('id2')!);
    this.prontuarioOrigem = JSON.parse(this.route.snapshot.paramMap.get('id')!);

    this.buscarProntuarioMedicamentoParaAlterar();
    this.buscarMedicamentos();
    this.desabilitaEdicaoCampo();
  }

  buscarMedicamentos(){
    this.serviceMed.pesquisarTodos().subscribe((resposta) => {
        this.medicamentos = resposta;
    },err =>{   
        this.service.mensagem(err.error.message);
    })
  }

  desabilitaEdicaoCampo(){
    if(parseInt(this.cargoUsuario) === 1 || parseInt(this.cargoUsuario) === 3)
    {
      this.disabled=false;
    }
  }

  buscarProntuarioMedicamentoParaAlterar(): void {
    this.service.pesquisarPorId(this.prontuarioMedicamento.id!).subscribe((resposta) => {
      this.prontuarioMedicamento = resposta;
      console.log(this.prontuarioMedicamento);
      this.formulario.get("codigoMedicamentoId")?.setValue(this.prontuarioMedicamento.medicamento.id);
      this.formulario.get("orientacoes")?.setValue(this.prontuarioMedicamento.orientacoes);
    });
  }


  alterarProntuarioMedicamentoParaSalvar(): void {
    this.prontuarioMedicamento.medicamento.id = this.formulario.get("codigoMedicamentoId")?.value;
    this.prontuarioMedicamento.orientacoes = this.formulario.get("orientacoes")?.value;
    console.log(this.prontuarioMedicamento);
  }

  editar(): void{
    this.alterarProntuarioMedicamentoParaSalvar();
    this.service.editar(this.prontuarioMedicamento.id!, this.prontuarioMedicamento).subscribe((resposta) => {
      let irParaEdicao : string = "prontuarios/edita/" + this.prontuarioOrigem;
      this.router.navigate([irParaEdicao]);
      this.service.mensagem("Medicamento do prontuário alterado com sucesso!");
    },err =>{   
        this.service.mensagem(err.error.message);
    })
  }

  cancelar(){
    let irParaEdicao : string = "prontuarios/edita/" + this.prontuarioOrigem;
    this.router.navigate([irParaEdicao]);
  }

}
