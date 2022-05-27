import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { LogoutService } from './../../seguranca/logout.service';
import { AuthService } from './../../seguranca/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  mostrarMenu = true;
  usuarioLogado = '';

  constructor(
    private authService: AuthService,
    private logoutService: LogoutService,
    private router: Router,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.usuarioLogado = this.authService.jwtPayload?.nome;
  }

  public exibirMenu(): void {
    this.mostrarMenu = !this.mostrarMenu;
  }

  temPermissao(permissao: string): any {
    return this.authService.temPermissao(permissao);
  }

  logout(): void {
    this.logoutService.logout()
      .then( () => {
        this.router.navigate(['/login']);
      })
      .catch( erro => this.errorHandler.mostrarErro(erro));
  }
}
