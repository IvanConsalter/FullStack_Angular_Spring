import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { LoginFormComponent } from './login-form/login-form.component';

import { SegurancaRoutingModule } from './seguranca-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    SharedModule,

    InputTextModule,
    ButtonModule,

    SegurancaRoutingModule
  ]
})

export class SegurancaModule { }