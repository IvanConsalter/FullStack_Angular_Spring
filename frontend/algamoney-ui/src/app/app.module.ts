import { SegurancaModule } from './seguranca/seguranca.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// My Components
import { AppComponent } from './app.component';

// my modules
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { DecimalPipe } from '@angular/common';

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
    SegurancaModule,
    AppRoutingModule
  ],
  providers: [DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
