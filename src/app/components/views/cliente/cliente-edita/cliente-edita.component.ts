import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cliente-edita',
  templateUrl: './cliente-edita.component.html',
  styleUrls: ['./cliente-edita.component.css']
})
export class ClienteEditaComponent implements OnInit {
  dataAtual!: Date ;

  cliente: Cliente = {
    nome:'',
    cpf: '',
    sexo: '',
    dataNascimento: '',
    email: '',
    convenioMedico:'',
    numeroCarteirinha: ''
  }

  constructor(
    private router: Router, 
    private service: ClienteService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.cliente.id = this.route.snapshot.paramMap.get('id')!;
    this.buscarClienteParaAlterar();
  }

  buscarClienteParaAlterar(): void {
    this.service.pesquisarPorId(this.cliente.id!).subscribe((resposta) => {
      this.cliente = resposta;
      let dataFormat = this.cliente.dataNascimento.substring(3,5) + '/' + this.cliente.dataNascimento.substring(0,2) + '/' + this.cliente.dataNascimento.substring(6,10);
      this.dataAtual = new Date(dataFormat);
    });
  }

  editar(): void{
    this.cliente.dataNascimento = this.dataAtual.toLocaleDateString();
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
