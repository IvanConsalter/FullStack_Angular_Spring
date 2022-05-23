import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { LoginFormComponent } from './login-form/login-form.component';

import { SegurancaRoutingModule } from './seguranca-routing.module';
import { SharedModule } from '../shared/shared.module';

export function pegarToken(): string {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: pegarToken,
        allowedDomains: ['localhost:8080'],
        disallowedRoutes: ['http://localhost:8080/oauth/token']
      }
    }),

    SharedModule,

    InputTextModule,
    ButtonModule,

    SegurancaRoutingModule
  ],
  providers: [JwtHelperService]
})

export class SegurancaModule { }
