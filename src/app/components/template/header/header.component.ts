import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() abreNavBarR = new EventEmitter();
  abrirNavBar = true;

  usuarioLogado!: string;
  cargo!: string;

  constructor(private authService: AuthService, private router : Router) { }

  ngOnInit(): void {
    this.usuarioLogado = this.authService.getUsuarioAutenticado();
    this.cargo = this.authService.getCargo()
    console.log(this.cargo);
  }

  logout(){
    this.authService.encerrarSessao();
    this.router.navigate(['login']);
  }
  public exibirOcultarNavBar(){
    this.abrirNavBar = this.abrirNavBar === true ? false : true;
    this.abreNavBarR.emit(this.abrirNavBar);
  }
}
