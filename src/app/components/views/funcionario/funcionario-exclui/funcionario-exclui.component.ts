import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Funcionario } from '../funcionario.model';
import { FuncionarioService } from '../funcionario.service';

@Component({
  selector: 'app-funcionario-exclui',
  templateUrl: './funcionario-exclui.component.html',
  styleUrls: ['./funcionario-exclui.component.css']
})
export class FuncionarioExcluiComponent implements OnInit {

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
    private service: FuncionarioService, 
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
   this.funcionario.id = this.route.snapshot.paramMap.get('id')!;
   this.buscarFuncionarioParaExcluir();
  }

  buscarFuncionarioParaExcluir(): void {
    this.service.pesquisarPorId(this.funcionario.id!).subscribe((resposta) => {
      this.funcionario = resposta;
    });
  }

  excluir(): void{
    this.service.excluir(this.funcionario.id!).subscribe((resposta) => {
      this.router.navigate(["funcionarios"]);
      this.service.mensagem('Funcionario excluído com sucesso.');
    },
    err =>{   
      this.service.mensagem(err.error.message);
    }     
    );
  }

  voltar(): void{
    this.router.navigate(["funcionarios"]);
  }
}
