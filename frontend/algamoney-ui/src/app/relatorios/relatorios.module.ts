import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { SharedModule } from '../shared/shared.module';

import { CalendarModule } from 'primeng/calendar';

import { RelatorioLancamentosComponent } from './relatorio-lancamentos/relatorio-lancamentos.component';


@NgModule({
  declarations: [
    RelatorioLancamentosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    CalendarModule,

    RelatoriosRoutingModule,
    SharedModule
  ]
})
export class RelatoriosModule { }
