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
  dateAtual: Date = new Date();
  cliente: Cliente = {
    nome:'',
    cpf: '',
    sexo: '',
    dataNascimento: this.dateAtual.toLocaleDateString(),
    email: '',
    convenioMedico:'',
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
        console.log('err.error: ');   
        console.log(err.error);   
        console.log('err.error.message: ');   
        console.log(err.error.message);   
        this.service.mensagem(err.error.message);
    })
  }

  cancelar(){
    this.router.navigate(["clientes"]);
  }

}
