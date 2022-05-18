import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(
    private config: PrimeNGConfig,
    private translateService: TranslateService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.translateService.setDefaultLang('pt');
    this.translateService.get('primeng')
      .subscribe( resposta => this.config.setTranslation(resposta));
  }

  exibirNavBar(): boolean {
    if (this.router.url !== '/login') {
      return true;
    }

    return false;
  }
}
