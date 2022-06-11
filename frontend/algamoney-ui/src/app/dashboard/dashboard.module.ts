import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { PanelModule } from 'primeng/panel';
import { ChartModule } from 'primeng/chart';
import { CalendarModule } from 'primeng/calendar';

import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    PanelModule,
    ChartModule,
    CalendarModule,

    SharedModule,
    DashboardRoutingModule
  ],
  providers: [
    DecimalPipe
  ]
})
export class DashboardModule { }
