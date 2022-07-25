import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  title = 'SGCM-frontend';
  abreNavBar = true;

  public reciverFeedBack(retorno: any){
    this.abreNavBar = retorno;
  }
}
