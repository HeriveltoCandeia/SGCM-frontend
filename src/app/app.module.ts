import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/template/header/header.component';

import { MatToolbarModule} from '@angular/material/toolbar';
import { FooterComponent } from './components/template/footer/footer.component';
import { NavComponent } from './components/template/nav/nav.component';
import { MatSidenavModule } from '@angular/material/sidenav'; 
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

//Componentes da aplicação
import { HomeComponent } from './components/views/home/home.component'; 
import { MedicamentoListaComponent } from './components/views/medicamento/medicamento-lista/medicamento-lista.component';
import { MedicamentoIncluiComponent } from './components/views/medicamento/medicamento-inclui/medicamento-inclui.component';
import { MedicamentoExcluiComponent } from './components/views/medicamento/medicamento-exclui/medicamento-exclui.component';
import { MedicamentoEditaComponent } from './components/views/medicamento/medicamento-edita/medicamento-edita.component';
import { ExameListaComponent } from './components/views/exame/exame-lista/exame-lista.component';
import { ExameIncluiComponent } from './components/views/exame/exame-inclui/exame-inclui.component';
import { ExameExcluiComponent } from './components/views/exame/exame-exclui/exame-exclui.component';
import { ExameEditaComponent } from './components/views/exame/exame-edita/exame-edita.component';
import { FuncionarioListaComponent } from './components/views/funcionario/funcionario-lista/funcionario-lista.component';
import { FuncionarioIncluiComponent } from './components/views/funcionario/funcionario-inclui/funcionario-inclui.component';
import { FuncionarioExcluiComponent } from './components/views/funcionario/funcionario-exclui/funcionario-exclui.component';
import { FuncionarioEditaComponent } from './components/views/funcionario/funcionario-edita/funcionario-edita.component';
import { ClienteListaComponent } from './components/views/cliente/cliente-lista/cliente-lista.component';
import { ClienteIncluiComponent } from './components/views/cliente/cliente-inclui/cliente-inclui.component';
import { ClienteExcluiComponent } from './components/views/cliente/cliente-exclui/cliente-exclui.component';
import { ClienteEditaComponent } from './components/views/cliente/cliente-edita/cliente-edita.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    MedicamentoListaComponent,
    MedicamentoIncluiComponent,
    MedicamentoExcluiComponent,
    MedicamentoEditaComponent,
    ExameListaComponent,
    ExameIncluiComponent,
    ExameExcluiComponent,
    ExameEditaComponent,
    FuncionarioListaComponent,
    FuncionarioIncluiComponent,
    FuncionarioExcluiComponent,
    FuncionarioEditaComponent,
    ClienteListaComponent,
    ClienteIncluiComponent,
    ClienteExcluiComponent,
    ClienteEditaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatMenuModule,
    MatSelectModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false
    })
  ],
  providers: [{provide: LOCALE_ID,      useValue: 'pt-BR'    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
