import { Component, OnInit } from '@angular/core';

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
    this.authService.logout();
  }
}
