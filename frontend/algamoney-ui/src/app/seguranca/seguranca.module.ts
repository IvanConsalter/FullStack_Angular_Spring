import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

import { AuthGuard } from './auth.guard';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { SegurancaRoutingModule } from './seguranca-routing.module';
import { SharedModule } from '../shared/shared.module';

import { MoneyHttpInterceptor } from './money-http-interceptor';

import { environment } from 'src/environments/environment';
import { AuthorizedComponent } from './authorized/authorized.component';

export function pegarToken(): string {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [

    AuthorizedComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: pegarToken,
        allowedDomains: environment.tokenAllowedDomains,
        disallowedRoutes: environment.tokenDisallowedRoutes
      }
    }),

    SharedModule,

    InputTextModule,
    ButtonModule,

    SegurancaRoutingModule
  ],
  providers: [
    JwtHelperService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MoneyHttpInterceptor,
      multi: true
    }
  ]
})

export class SegurancaModule { }
