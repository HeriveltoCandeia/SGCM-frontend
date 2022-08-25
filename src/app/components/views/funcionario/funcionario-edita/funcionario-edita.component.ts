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

  dataAtual!: Date;
  dataAdmissaoAtual!: Date;
  codigoCargoSelecionado = "";

  funcionario: Funcionario = {
    nome:'',
    cpf: '',
    sexo: '',
    dataNascimento: '',
    email: '',
    codigoCargo:0,
    dataAdmissao: '',
    dataDesligamento: '',
    usuario: '',
    senha: ''
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
      this.codigoCargoSelecionado = "" + this.funcionario.codigoCargo;
      let dataFormatada;
      dataFormatada = this.formataData(this.funcionario.dataNascimento);
      this.dataAtual = new Date(dataFormatada);      
      if(this.funcionario.dataAdmissao)
      {
        dataFormatada = this.formataData(this.funcionario.dataAdmissao);
        this.dataAdmissaoAtual = new Date(dataFormatada);      
      }
    });
  }

  public formataData(dataRecebida: String){
    let dataFormat = dataRecebida.substring(3,5) + '/' + dataRecebida.substring(0,2) + '/' + dataRecebida.substring(6,10);
    return dataFormat;    
  }

  editar(): void{
    this.funcionario.dataNascimento = this.dataAtual.toLocaleDateString();
    this.funcionario.dataAdmissao = this.dataAdmissaoAtual.toLocaleDateString();
    this.funcionario.codigoCargo = parseInt(this.codigoCargoSelecionado);
    this.service.editar(this.funcionario.id!, this.funcionario).subscribe((resposta) => {
      this.router.navigate(["funcionarios"]);
      this.service.mensagem("Funcionario alterado com sucesso!");
    },err =>{   
        this.service.mensagem(err.error.message);
    })
  }

  demitirFuncionario(): void{
    if (this.funcionario.dataDesligamento)
    {
      this.service.mensagem("Funcionário já desligado");
      return; 
    }
    let dataHoje = new Date();
    this.funcionario.dataDesligamento = dataHoje.toLocaleDateString();
    this.funcionario.senha = '#$#$#$#$'
    this.service.editar(this.funcionario.id!, this.funcionario).subscribe((resposta) => {
//      this.router.navigate(["funcionarios"]);
      this.service.mensagem("Funcionario desligado com sucesso!");
    },err =>{   
        this.service.mensagem(err.error.message);
    })
  }

  cancelar(){
    this.router.navigate(["funcionarios"]);
  }

}
