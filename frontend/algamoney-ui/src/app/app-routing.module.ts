import { LancamentosPesquisaComponent } from './lancamentos/lancamentos-pesquisa/lancamentos-pesquisa.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
import { NaoAutorizadoComponent } from './core/nao-autorizado/nao-autorizado.component';

const routes: Routes = [
  { path: 'lancamentos', loadChildren: () => import('../app/lancamentos/lancamentos.module').then(m => m.LancamentosModule)},
  { path: 'pessoas', loadChildren: () => import('../app/pessoas/pessoas.module').then(m => m.PessoasModule)},

  { path: '', component: LancamentosPesquisaComponent},
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: 'nao-autorizado', component: NaoAutorizadoComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
