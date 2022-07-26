import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']  
})
export class LayoutComponent {
  title = 'SGCM-frontend';
  abreNavBar = true;

  public reciverFeedBack(retorno: any){
    this.abreNavBar = retorno;
  }
}