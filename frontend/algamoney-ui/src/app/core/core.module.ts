import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

// PrimeNg
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

// Services
import { LancamentoService } from '../lancamentos/lancamento.service';
import { PessoaService } from '../pessoas/pessoa.service';
import { ErrorHandlerService } from './error-handler.service';
import { AuthService } from '../seguranca/auth.service';

// Components
import { NavbarComponent } from './navbar/navbar.component';

// Translate
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import localePt from '@angular/common/locales/pt';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
registerLocaleData(localePt, 'pt-BR');

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    // PrimeNg
    ToastModule,
    ConfirmDialogModule,
    // Translate
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  exports: [
    NavbarComponent,

    ToastModule,
    ConfirmDialogModule
  ],
  providers: [
    DatePipe,
    Title,

    LancamentoService,
    PessoaService,
    ErrorHandlerService,
    AuthService,
    // PrimeNg
    MessageService,
    ConfirmationService,
    TranslateService
  ]
})
export class CoreModule { }
