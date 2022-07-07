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

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'medicamentos',
    component: MedicamentoListaComponent
  },
  {
    path:'medicamentos/inclui',
    component: MedicamentoIncluiComponent
  },
  {
    path:'medicamentos/exclui/:id',
    component: MedicamentoExcluiComponent
  },
  {
    path:'medicamentos/edita/:id',
    component: MedicamentoEditaComponent
  },
  {
    path:'exames',
    component: ExameListaComponent
  },
  {
    path:'exames/inclui',
    component: ExameIncluiComponent
  },
  {
    path:'exames/exclui/:id',
    component: ExameExcluiComponent
  },
  {
    path:'exames/edita/:id',
    component: ExameEditaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
