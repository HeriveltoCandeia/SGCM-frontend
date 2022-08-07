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
import { AgendaListaComponent } from './components/views/agenda/agenda-lista/agenda-lista.component';
import { AgendaIncluiComponent } from './components/views/agenda/agenda-inclui/agenda-inclui.component';
import { AgendaExcluiComponent } from './components/views/agenda/agenda-exclui/agenda-exclui.component';
import { AgendaEditaComponent } from './components/views/agenda/agenda-edita/agenda-edita.component';
import { ProntuarioListaComponent } from './components/views/prontuario/prontuario-lista/prontuario-lista.component';
import { ProntuarioExcluiComponent } from './components/views/prontuario/prontuario-exclui/prontuario-exclui.component';
import { ProntuarioMedicamentoListaComponent } from './components/views/prontuario medicamento/prontuario-medicamento-lista/prontuario-medicamento-lista.component';
import { ProntuarioMedicamentoExcluiComponent } from './components/views/prontuario medicamento/prontuario-medicamento-exclui/prontuario-medicamento-exclui.component';
import { ProntuarioMedicamentoIncluiComponent } from './components/views/prontuario medicamento/prontuario-medicamento-inclui/prontuario-medicamento-inclui.component';
import { ProntuarioExameListaComponent } from './components/views/prontuario exame/prontuario-exame-lista/prontuario-exame-lista.component';
import { ProntuarioExameExcluiComponent } from './components/views/prontuario exame/prontuario-exame-exclui/prontuario-exame-exclui.component';
import { ProntuarioIncluiComponent } from './components/views/prontuario/prontuario-inclui/prontuario-inclui.component';
import { ProntuarioEditaComponent } from './components/views/prontuario/prontuario-edita/prontuario-edita.component';
import { ProntuarioExameIncluiComponent } from './components/views/prontuario exame/prontuario-exame-inclui/prontuario-exame-inclui.component';
import { ProntuarioMedicamentoEditaComponent } from './components/views/prontuario medicamento/prontuario-medicamento-edita/prontuario-medicamento-edita.component';
import { ProntuarioExameEditaComponent } from './components/views/prontuario exame/prontuario-exame-edita/prontuario-exame-edita.component';
import { ProntuarioMedicamentoReceitaComponent } from './components/views/prontuario medicamento/prontuario-medicamento-receita/prontuario-medicamento-receita.component';
import { ProntuarioExameSolicitadoComponent } from './components/views/prontuario exame/prontuario-exame-solicitado/prontuario-exame-solicitado.component';

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
      },
      {
        path:'agendas',
        component: AgendaListaComponent,
        canActivate: [AuthGuard]
      },
      {
        path:'agendas/inclui',
        component: AgendaIncluiComponent,
        canActivate: [AuthGuard]
      },
      {
        path:'agendas/exclui/:id',
        component: AgendaExcluiComponent,
        canActivate: [AuthGuard]
      },
      {
        path:'agendas/edita/:id',
        component: AgendaEditaComponent,
        canActivate: [AuthGuard]
      },
      {
        path:'prontuarios',
        component: ProntuarioListaComponent,
        canActivate: [AuthGuard]
      },
      {
        path:'prontuarios/inclui',
        component: ProntuarioIncluiComponent,
        canActivate: [AuthGuard]
      },
      {
        path:'prontuarios/edita/:id',
        component: ProntuarioEditaComponent,
        canActivate: [AuthGuard]
      },
      {
        path:'prontuarios/exclui/:id',
        component: ProntuarioExcluiComponent,
        canActivate: [AuthGuard]
      },
      {
        path:'prontuariosMedicamentos',
        component: ProntuarioMedicamentoListaComponent,
        canActivate: [AuthGuard]
      },
      {
        path:'prontuariosMedicamentos/excluiMedicamentos/:id',
        component: ProntuarioMedicamentoExcluiComponent,
        canActivate: [AuthGuard]
      },
      {
        path:'prontuarios/edita/:id/excluiMedicamentos/:id2',
        component: ProntuarioMedicamentoExcluiComponent,
        canActivate: [AuthGuard]
      },
      {
        path:'prontuarios/edita/:id/editaMedicamentos/:id2',
        component: ProntuarioMedicamentoEditaComponent,
        canActivate: [AuthGuard]
      },
      {
        path:'prontuarios/edita/:id/incluiMedicamentos',
        component: ProntuarioMedicamentoIncluiComponent,
        canActivate: [AuthGuard]
      },
      {
        path:'prontuarios/edita/:id/receitaMedicamentos',
        component: ProntuarioMedicamentoReceitaComponent,
        canActivate: [AuthGuard]
      },      
      {
        path:'prontuarios/edita/:id/incluiExames',
        component: ProntuarioExameIncluiComponent,
        canActivate: [AuthGuard]
      },      
      {
        path:'prontuarios/edita/:id/examesSolicitados',
        component: ProntuarioExameSolicitadoComponent,
        canActivate: [AuthGuard]
      },      
      {
        path:'prontuarios/edita/:id/editaExames/:id2',
        component: ProntuarioExameEditaComponent,
        canActivate: [AuthGuard]
      },
      {
        path:'prontuarios/edita/:id/excluiExames/:id2',
        component: ProntuarioExameExcluiComponent,
        canActivate: [AuthGuard]
      },
      {
        path:'prontuariosExames',
        component: ProntuarioExameListaComponent,
        canActivate: [AuthGuard]
      },
      {
        path:'prontuariosExames/excluiExames/:id',
        component: ProntuarioExameExcluiComponent,
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
