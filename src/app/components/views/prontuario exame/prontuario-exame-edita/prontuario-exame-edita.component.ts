import { FuncionarioService } from '../../funcionario/funcionario.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProntuarioExameService } from '../prontuario-exame.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Funcionario } from '../../funcionario/funcionario.model';
import { Cliente } from '../../cliente/cliente.model';
import { ClienteService } from '../../cliente/cliente.service';
import { ProntuarioExame } from '../prontuario-exame.model';
import { Exame } from '../../exame/exame.model';
import { ExameService } from '../../exame/exame.service';
import { __values } from 'tslib';


@Component({
  selector: 'app-prontuario-exame-edita',
  templateUrl: './prontuario-exame-edita.component.html',
  styleUrls: ['./prontuario-exame-edita.component.css']
})
export class ProntuarioExameEditaComponent implements OnInit {
  clientes: Cliente[] = [];
  exames: Exame[] = [];
  medicos: Funcionario[] = [];
  codigoTipo = '';
  codigoSituacao = '';
  prontuarioOrigem = '';
  dataAtual!: Date;

  prontuarioExame: ProntuarioExame = {
    prontuarioMedico: {
      id: ''
    },
    exame: {
      id: '',
      descricao: ''
    },
    codigoSituacao: 0,
    resultado: ''
  };

  formulario!: FormGroup;

  constructor(
    private router: Router,
    private service: ProntuarioExameService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private serviceCli: ClienteService,
    private serviceMed: ExameService
  ) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      id: [''],
      codigoProntuarioId: ['', Validators.required],
      codigoExameId: ['', Validators.required],
      orientacoes: [''],
      resultado: [''],
    });
    this.prontuarioExame.id = JSON.parse(this.route.snapshot.paramMap.get('id2')!);
    this.prontuarioOrigem = JSON.parse(this.route.snapshot.paramMap.get('id')!);

    this.buscarProntuarioExameParaAlterar();
    this.buscarExames();
  }

  buscarExames() {
    this.serviceMed.pesquisarTodos().subscribe((resposta) => {
      this.exames = resposta;
    }, err => {
      this.service.mensagem(err.error.message);
    });
  }


  buscarProntuarioExameParaAlterar(): void {
    this.service.pesquisarPorId(this.prontuarioExame.id!).subscribe((resposta) => {
      this.prontuarioExame = resposta;
      console.log(this.prontuarioExame);
      this.formulario.get("codigoExameId")?.setValue(this.prontuarioExame.exame.id);
      this.formulario.get("orientacoes")?.setValue(this.prontuarioExame.orientacoes);
      this.formulario.get("resultado")?.setValue(this.prontuarioExame.resultado);
    });
  }


  alterarProntuarioExameParaSalvar(): void {
    this.prontuarioExame.exame.id = this.formulario.get("codigoExameId")?.value;
    this.prontuarioExame.orientacoes = this.formulario.get("orientacoes")?.value;
    this.prontuarioExame.resultado = this.formulario.get("resultado")?.value;
    console.log(this.prontuarioExame);
  }

  editar(): void {
    this.alterarProntuarioExameParaSalvar();
    this.service.editar(this.prontuarioExame.id!, this.prontuarioExame).subscribe((resposta) => {
      let irParaEdicao: string = "prontuarios/edita/" + this.prontuarioOrigem;
      this.router.navigate([irParaEdicao]);
      this.service.mensagem("Prontuario alterado com sucesso!");
    }, err => {
      this.service.mensagem(err.error.message);
    });
  }

  cancelar() {
    let irParaEdicao: string = "prontuarios/edita/" + this.prontuarioOrigem;
    this.router.navigate([irParaEdicao]);
  }

}


