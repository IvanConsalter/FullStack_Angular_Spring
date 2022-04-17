import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// My Components
import { AppComponent } from './app.component';

// my modules
import { CoreModule } from './core/core.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';

// my services
import { LancamentoService } from './lancamentos/lancamento.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    // Angular Modules
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // My Modules
    CoreModule,
    LancamentosModule,
    PessoasModule,
  ],
  providers: [
    LancamentoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
