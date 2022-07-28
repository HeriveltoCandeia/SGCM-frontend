import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExameListaComponent } from './components/views/exame/exame-lista/exame-lista.component';
import { ExameIncluiComponent } from './components/views/exame/exame-inclui/exame-inclui.component';
import { ExameExcluiComponent } from './components/views/exame/exame-exclui/exame-exclui.component';
import { ExameEditaComponent } from './components/views/exame/exame-edita/exame-edita.component';

import { HomeComponent } from './components/views/home/home.component';
import { MedicamentoListaComponent } from './components/views/medicamento/medicamento-lista/medicamento-lista.component';
import { MedicamentoIncluiComponent } from './components/views/medicamento/medicamento-inclui/medicamento-inclui.component';
import { MedicamentoExcluiComponent } from './components/views/medicamento/medicamento-exclui/medicamento-exclui.component';
import { MedicamentoEditaComponent } from './components/views/medicamento/medicamento-edita/medicamento-edita.component';

import { FuncionarioListaComponent } from './components/views/funcionario/funcionario-lista/funcionario-lista.component';
import { FuncionarioIncluiComponent } from './components/views/funcionario/funcionario-inclui/funcionario-inclui.component';
import { FuncionarioExcluiComponent } from './components/views/funcionario/funcionario-exclui/funcionario-exclui.component';
import { FuncionarioEditaComponent } from './components/views/funcionario/funcionario-edita/funcionario-edita.component';

import { ClienteListaComponent } from './components/views/cliente/cliente-lista/cliente-lista.component';
import { ClienteIncluiComponent } from './components/views/cliente/cliente-inclui/cliente-inclui.component';
import { ClienteExcluiComponent } from './components/views/cliente/cliente-exclui/cliente-exclui.component';
import { ClienteEditaComponent } from './components/views/cliente/cliente-edita/cliente-edita.component';
import { LoginComponent } from './components/views/login/login.component';
import { LayoutComponent } from './components/views/layout/layout.component';
import { AuthGuard } from './components/guard/auth.guard';

const routes: Routes = [
  {
    path:'',
    component: LayoutComponent, children: [
      {
        path:'',
        component: HomeComponent,
        canActivate: [AuthGuard]
      },
      {
        path:'medicamentos',
        component: MedicamentoListaComponent,
        canActivate: [AuthGuard]
      },
      {
        path:'medicamentos/inclui',
        component: MedicamentoIncluiComponent,
        canActivate: [AuthGuard]
      },
      {
        path:'medicamentos/exclui/:id',
        component: MedicamentoExcluiComponent,
        canActivate: [AuthGuard]
      },
      {
        path:'medicamentos/edita/:id',
        component: MedicamentoEditaComponent,
        canActivate: [AuthGuard]
      },
      {
        path:'exames',
        component: ExameListaComponent,
        canActivate: [AuthGuard]
      },
      {
        path:'exames/inclui',
        component: ExameIncluiComponent,
        canActivate: [AuthGuard]
      },
      {
        path:'exames/exclui/:id',
        component: ExameExcluiComponent,
        canActivate: [AuthGuard]
      },
      {
        path:'exames/edita/:id',
        component: ExameEditaComponent,
        canActivate: [AuthGuard]
      },
      {
        path:'funcionarios',
        component: FuncionarioListaComponent,
        canActivate: [AuthGuard]
      },
      {
        path:'funcionarios/inclui',
        component: FuncionarioIncluiComponent,
        canActivate: [AuthGuard]
      },
      {
        path:'funcionarios/exclui/:id',
        component: FuncionarioExcluiComponent,
        canActivate: [AuthGuard]
      },
      {
        path:'funcionarios/edita/:id',
        component: FuncionarioEditaComponent,
        canActivate: [AuthGuard]
      },
      {
        path:'clientes',
        component: ClienteListaComponent,
        canActivate: [AuthGuard]
      },
      {
        path:'clientes/inclui',
        component: ClienteIncluiComponent,
        canActivate: [AuthGuard]
      },
      {
        path:'clientes/exclui/:id',
        component: ClienteExcluiComponent,
        canActivate: [AuthGuard]
      },
      {
        path:'clientes/edita/:id',
        component: ClienteEditaComponent,
        canActivate: [AuthGuard]
      }    
    ]
  },
  {
    path:'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
