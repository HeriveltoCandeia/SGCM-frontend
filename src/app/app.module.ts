import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask';
import { ReactiveFormsModule } from "@angular/forms";

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
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';

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
import { LoginComponent } from './components/views/login/login.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { LayoutComponent } from './components/views/layout/layout.component';
import { TokenHttpInterceptor} from './components/interceptor/token-http.interceptor';
import { AgendaListaComponent } from './components/views/agenda/agenda-lista/agenda-lista.component';
import { AgendaIncluiComponent } from './components/views/agenda/agenda-inclui/agenda-inclui.component';
import { AgendaExcluiComponent } from './components/views/agenda/agenda-exclui/agenda-exclui.component';
import { AgendaEditaComponent } from './components/views/agenda/agenda-edita/agenda-edita.component';

import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { ProntuarioListaComponent } from './components/views/prontuario/prontuario-lista/prontuario-lista.component';
import { ProntuarioExcluiComponent } from './components/views/prontuario/prontuario-exclui/prontuario-exclui.component';
import { ProntuarioMedicamentoListaComponent } from './components/views/prontuario medicamento/prontuario-medicamento-lista/prontuario-medicamento-lista.component';
import { ProntuarioMedicamentoExcluiComponent } from './components/views/prontuario medicamento/prontuario-medicamento-exclui/prontuario-medicamento-exclui.component';
import { ProntuarioMedicamentoIncluiComponent } from './components/views/prontuario medicamento/prontuario-medicamento-inclui/prontuario-medicamento-inclui.component';
import { ProntuarioExameListaComponent } from './components/views/prontuario exame/prontuario-exame-lista/prontuario-exame-lista.component';
import { ProntuarioExameExcluiComponent } from './components/views/prontuario exame/prontuario-exame-exclui/prontuario-exame-exclui.component';
import { ProntuarioIncluiComponent } from './components/views/prontuario/prontuario-inclui/prontuario-inclui.component';
import { ProntuarioEditaComponent } from './components/views/prontuario/prontuario-edita/prontuario-edita.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ProntuarioExameIncluiComponent } from './components/views/prontuario exame/prontuario-exame-inclui/prontuario-exame-inclui.component';
import { ProntuarioMedicamentoEditaComponent } from './components/views/prontuario medicamento/prontuario-medicamento-edita/prontuario-medicamento-edita.component';
import { ProntuarioExameEditaComponent } from './components/views/prontuario exame/prontuario-exame-edita/prontuario-exame-edita.component';
import { ProntuarioMedicamentoReceitaComponent } from './components/views/prontuario medicamento/prontuario-medicamento-receita/prontuario-medicamento-receita.component';
import { ProntuarioExameSolicitadoComponent } from './components/views/prontuario exame/prontuario-exame-solicitado/prontuario-exame-solicitado.component';
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
    ClienteEditaComponent,
    AgendaListaComponent,
    AgendaIncluiComponent,
    AgendaExcluiComponent,
    AgendaEditaComponent,
    ProntuarioListaComponent,
    ProntuarioExcluiComponent,
    ProntuarioIncluiComponent,
    ProntuarioEditaComponent,
    ProntuarioMedicamentoListaComponent,
    ProntuarioMedicamentoExcluiComponent,
    ProntuarioMedicamentoEditaComponent,
    ProntuarioMedicamentoIncluiComponent,
    ProntuarioMedicamentoReceitaComponent,
    ProntuarioExameListaComponent,
    ProntuarioExameExcluiComponent,
    ProntuarioExameEditaComponent,
    ProntuarioExameIncluiComponent,
    ProntuarioExameSolicitadoComponent,
    LoginComponent,
    LayoutComponent
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
    }),
    ReactiveFormsModule,
    MatPaginatorModule,
    MatGridListModule,
    NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule,
    MatTabsModule,
    MatDialogModule,
    MatExpansionModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    {provide: HTTP_INTERCEPTORS, useClass: TokenHttpInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
