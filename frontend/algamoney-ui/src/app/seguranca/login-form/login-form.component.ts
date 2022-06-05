import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router,
    private erroHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
  }

  login(usuario: string, senha: string): void {
    this.authService.login(usuario, senha)
      .then( () => {
        this.router.navigate(['/dashboard']);
      })
      .catch(erro => this.erroHandler.mostrarErro(erro));
  }

}
