import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cliente-exclui',
  templateUrl: './cliente-exclui.component.html',
  styleUrls: ['./cliente-exclui.component.css']
})
export class ClienteExcluiComponent implements OnInit {

  cliente: Cliente = {
    nome:'',
    cpf: '',
    sexo: '',
    dataNascimento: '',
    email: '',
    codigoConvenio:0,
    numeroCarteirinha: ''
  }

  constructor(
    private service: ClienteService, 
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
   this.cliente.id = this.route.snapshot.paramMap.get('id')!;
   this.buscarClienteParaExcluir();
  }

  buscarClienteParaExcluir(): void {
    this.service.pesquisarPorId(this.cliente.id!).subscribe((resposta) => {
      this.cliente = resposta;
    });
  }

  excluir(): void{
    this.service.excluir(this.cliente.id!).subscribe((resposta) => {
      this.router.navigate(["clientes"]);
      this.service.mensagem('Cliente excluído com sucesso.');
    },
    err =>{   
      this.service.mensagem(err.error.message);
    }     
    );
  }

  voltar(): void{
    this.router.navigate(["clientes"]);
  }
}
