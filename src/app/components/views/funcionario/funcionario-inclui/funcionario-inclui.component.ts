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

  funcionario: Funcionario = {
    nome:'',
    cpf: '12345678910',
    sexo: 'M',
    dataNascimento: '12.01.1975',
    email: 'teste@gmail.com',
    codigoCargo:1,
    dataAdmissao: '19.07.2022',
  }

  constructor(private router:Router, private service: FuncionarioService) { }

  ngOnInit(): void {
  }

  incluir(): void{
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
