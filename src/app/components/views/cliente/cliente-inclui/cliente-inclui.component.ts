import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cliente-inclui',
  templateUrl: './cliente-inclui.component.html',
  styleUrls: ['./cliente-inclui.component.css']
})
export class ClienteIncluiComponent implements OnInit {

  cliente: Cliente = {
    nome:'',
    cpf: '12345678910',
    sexo: 'M',
    dataNascimento: '12.01.1975',
    email: 'teste@gmail.com',
    codigoConvenio:0,
    numeroCarteirinha: ''
  }

  constructor(private router:Router, private service: ClienteService) { }

  ngOnInit(): void {
  }

  incluir(): void{
    this.service.incluir(this.cliente).subscribe((resposta) => {
      this.router.navigate(["clientes"]);
      this.service.mensagem("Cliente incluído com sucesso!");
    },err =>{   
        this.service.mensagem(err.error.message);
    })
  }

  cancelar(){
    this.router.navigate(["clientes"]);
  }

}
