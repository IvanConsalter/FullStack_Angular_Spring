import { AuthService } from './../../seguranca/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  mostrarMenu = true;
  usuarioLogado = '';

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.usuarioLogado = this.authService.jwtPayload?.nome;
  }

  public exibirMenu(): void {
    this.mostrarMenu = !this.mostrarMenu;
  }
}
