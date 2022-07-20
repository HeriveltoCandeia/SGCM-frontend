import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Funcionario } from '../funcionario.model';
import { FuncionarioService } from '../funcionario.service';

@Component({
  selector: 'app-funcionario-edita',
  templateUrl: './funcionario-edita.component.html',
  styleUrls: ['./funcionario-edita.component.css']
})
export class FuncionarioEditaComponent implements OnInit {

  funcionario: Funcionario = {
    nome:'',
    cpf: '',
    sexo: '',
    dataNascimento: '',
    email: '',
    codigoCargo:0,
    dataAdmissao: '',
    dataDesligamento: ''
  }

  constructor(
    private router: Router, 
    private service: FuncionarioService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.funcionario.id = this.route.snapshot.paramMap.get('id')!;
    this.buscarFuncionarioParaAlterar();
  }

  buscarFuncionarioParaAlterar(): void {
    this.service.pesquisarPorId(this.funcionario.id!).subscribe((resposta) => {
      this.funcionario = resposta;
    });
  }

  editar(): void{
    this.service.editar(this.funcionario.id!, this.funcionario).subscribe((resposta) => {
      this.router.navigate(["funcionarios"]);
      this.service.mensagem("Funcionario alterado com sucesso!");
    },err =>{   
        this.service.mensagem(err.error.message);
    })
  }

  cancelar(){
    this.router.navigate(["funcionarios"]);
  }

}
