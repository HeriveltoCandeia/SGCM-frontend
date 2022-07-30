import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Agenda } from '../agenda.model';
import { AgendaService } from '../agenda.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { __values } from 'tslib';

@Component({
  selector: 'app-agenda-edita',
  templateUrl: './agenda-edita.component.html',
  styleUrls: ['./agenda-edita.component.css']
})
export class AgendaEditaComponent implements OnInit {
  dataAtual!: Date ;
  public mask = {
    guide: true,
    showMask : true,
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/',/\d/, /\d/,/\d/, /\d/]
  };
    agenda: Agenda = {
    nome:'',
    cpf: '',
    sexo: '',
    dataNascimento: '',
    email: '',
    convenioMedico:'',
    numeroCarteirinha: ''
  }

    formulario!: FormGroup;

  constructor(
    private router: Router, 
    private service: AgendaService,
    private route: ActivatedRoute,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nome:['', Validators.required],
      cpf: ['', Validators.required],
      sexo: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      convenioMedico:[''],
      numeroCarteirinha: ['']  
    })
    this.agenda.id = this.route.snapshot.paramMap.get('id')!;
    this.buscarAgendaParaAlterar();
  }

  buscarAgendaParaAlterar(): void {
    this.service.pesquisarPorId(this.agenda.id!).subscribe((resposta) => {
      this.agenda = resposta;
      let dataFormat = this.agenda.dataNascimento.substring(3,5) + '/' + this.agenda.dataNascimento.substring(0,2) + '/' + this.agenda.dataNascimento.substring(6,10);
      this.dataAtual = new Date(dataFormat);
      this.formulario.get("nome")?.setValue(this.agenda.nome);
      this.formulario.get("cpf")?.setValue(this.agenda.cpf);
      this.formulario.get("dataNascimento")?.setValue(this.dataAtual);
      this.formulario.get("sexo")?.setValue(this.agenda.sexo);
      this.formulario.get("email")?.setValue(this.agenda.email);
      this.formulario.get("convenioMedico")?.setValue(this.agenda.convenioMedico);
      this.formulario.get("numeroCarteirinha")?.setValue(this.agenda.numeroCarteirinha);

    });
  }


  alterarAgendaParaSalvar(): void {
    this.agenda.nome = this.formulario.get("nome")?.value;
    this.agenda.cpf = this.formulario.get("cpf")?.value;
    this.dataAtual = this.formulario.get("dataNascimento")?.value;
    this.agenda.dataNascimento = this.dataAtual.toLocaleDateString();
    this.agenda.sexo = this.formulario.get("sexo")?.value;
    this.agenda.email = this.formulario.get("email")?.value;
    this.agenda.convenioMedico = this.formulario.get("convenioMedico")?.value;
    this.agenda.numeroCarteirinha = this.formulario.get("numeroCarteirinha")?.value;
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
