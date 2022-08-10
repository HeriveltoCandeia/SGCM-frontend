import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Funcionario } from '../funcionario/funcionario.model';
import { FuncionarioService } from '../funcionario/funcionario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username!: string;
  password!: string;
  loginError!: boolean;

  constructor(private router:Router, private authService: AuthService, private servMens: FuncionarioService) {}

  ngOnInit(): void {
  }

  entrar(){
    this.authService
        .tentarLogar(this.username, this.password)
        .subscribe((resposta) =>{
          const access_token = JSON.stringify(resposta);
          localStorage.setItem('access_token', access_token);
//******************************************************************
          let func!:Funcionario;
          this.servMens.pesquisarPorUsuario(this.username).subscribe((resposta1) => {
            func = resposta1;
            console.log(resposta1);
            localStorage.removeItem(access_token);
            resposta.usuario={};
            resposta.usuario.cargo = func.codigoCargo;
            resposta.usuario.id = func.id;
            const access_tokenP = JSON.stringify(resposta);
            localStorage.setItem('access_token', access_tokenP);
            this.router.navigate([""]);  
          });
//******************************************************************
        }, error =>
        {
          console.log(error);
          if ((error.error.error == "invalid_grant") && (error.error.error_description=="Bad credentials"))
          {
            this.servMens.mensagem("Usuário ou Senha inválido");
          }
        })
  }
}
