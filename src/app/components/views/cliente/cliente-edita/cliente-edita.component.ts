import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { __values } from 'tslib';

@Component({
  selector: 'app-cliente-edita',
  templateUrl: './cliente-edita.component.html',
  styleUrls: ['./cliente-edita.component.css']
})
export class ClienteEditaComponent implements OnInit {
  dataAtual!: Date ;
  public mask = {
    guide: true,
    showMask : true,
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/',/\d/, /\d/,/\d/, /\d/]
  };
    cliente!: Cliente; 
/*    = {
    nome:'',
    cpf: '',
    sexo: '',
    dataNascimento: '',
    email: '',
    convenioMedico:'',
    numeroCarteirinha: ''
  }*/

    formulario!: FormGroup;

  constructor(
    private router: Router, 
    private service: ClienteService,
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
    this.cliente.id = this.route.snapshot.paramMap.get('id')!;
    this.buscarClienteParaAlterar();
  }

  buscarClienteParaAlterar(): void {
    this.service.pesquisarPorId(this.cliente.id!).subscribe((resposta) => {
      this.cliente = resposta;
      let dataFormat = this.cliente.dataNascimento.substring(3,5) + '/' + this.cliente.dataNascimento.substring(0,2) + '/' + this.cliente.dataNascimento.substring(6,10);
      this.dataAtual = new Date(dataFormat);
      this.formulario.get("nome")?.setValue(this.cliente.nome);
      this.formulario.get("cpf")?.setValue(this.cliente.cpf);
      this.formulario.get("dataNascimento")?.setValue(this.dataAtual);
      this.formulario.get("sexo")?.setValue(this.cliente.sexo);
      this.formulario.get("email")?.setValue(this.cliente.email);
      this.formulario.get("convenioMedico")?.setValue(this.cliente.convenioMedico);
      this.formulario.get("numeroCarteirinha")?.setValue(this.cliente.numeroCarteirinha);

    });
  }


  alterarClienteParaSalvar(): void {
    this.cliente.nome = this.formulario.get("nome")?.value;
    this.cliente.cpf = this.formulario.get("cpf")?.value;
    this.dataAtual = this.formulario.get("dataNascimento")?.value;
    this.cliente.dataNascimento = this.dataAtual.toLocaleDateString();
    this.cliente.sexo = this.formulario.get("sexo")?.value;
    this.cliente.email = this.formulario.get("email")?.value;
    this.cliente.convenioMedico = this.formulario.get("convenioMedico")?.value;
    this.cliente.numeroCarteirinha = this.formulario.get("numeroCarteirinha")?.value;
  }

  editar(): void{
    this.alterarClienteParaSalvar();
    this.service.editar(this.cliente.id!, this.cliente).subscribe((resposta) => {
      this.router.navigate(["clientes"]);
      this.service.mensagem("Cliente alterado com sucesso!");
    },err =>{   
        this.service.mensagem(err.error.message);
    })
  }

  cancelar(){
    this.router.navigate(["clientes"]);
  }

}
