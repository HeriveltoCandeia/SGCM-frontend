import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() abreNavBarR = new EventEmitter();
  abrirNavBar = true;
  constructor() { }

  ngOnInit(): void {
  }

  public exibirOcultarNavBar(){
    this.abrirNavBar = this.abrirNavBar === true ? false : true;
    this.abreNavBarR.emit(this.abrirNavBar);
  }
}
