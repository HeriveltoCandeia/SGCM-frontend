import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Funcionario } from '../funcionario.model';
import { FuncionarioService } from '../funcionario.service';

@Component({
  selector: 'app-funcionario-inclui',
  templateUrl: './funcionario-inclui.component.html',
  styleUrls: ['./funcionario-inclui.component.css']
})
export class FuncionarioIncluiComponent implements OnInit {

  dataAtual: Date = new Date();
  dataAdmissaoAtual: Date = new Date();
  codigoCargoSelecionado = "2";

  funcionario: Funcionario = {
    nome:'',
    cpf: '',
    sexo: '',
    dataNascimento:this.dataAtual.toLocaleDateString(),
    email: '',
    codigoCargo:1,
    dataAdmissao: this.dataAdmissaoAtual.toLocaleDateString(),
    usuario: '',
    senha: ''
  }

  constructor(private router:Router, private service: FuncionarioService) { }

  ngOnInit(): void {
  }

  incluir(): void{
    this.funcionario.codigoCargo = parseInt(this.codigoCargoSelecionado);
    console.log(this.dataAtual);
    this.service.incluir(this.funcionario).subscribe((resposta) => {
      this.router.navigate(["funcionarios"]);
      this.service.mensagem("Funcionario incluído com sucesso!");
    },err =>{   
        this.service.mensagem(err.error.message);
    })
  }

  cancelar(){
    this.router.navigate(["funcionarios"]);
  }

}
