import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
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
          this.router.navigate([""]);
        }, err =>
        {
          this.servMens.mensagem(err.error.message);
        })
  }
}
