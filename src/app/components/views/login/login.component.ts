import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username!: string;
  password!: string;
  loginError!: boolean;

  constructor(private router:Router) {}

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(`User: ${this.username}, Pass: ${this.password}`)
  }

  entrar(){
    this.router.navigate([""]);
  }
}
