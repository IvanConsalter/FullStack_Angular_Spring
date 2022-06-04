import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { erroNaoAutenticado } from './../seguranca/money-http-interceptor';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private router: Router,
    private messageService: MessageService
  ) { }

  mostrarErro(respostaErro: any): void {
    console.log(respostaErro);

    let mensagem: string;

    if (typeof respostaErro === 'string') {
      mensagem = respostaErro;
    }
    else if (respostaErro instanceof erroNaoAutenticado) {
      console.log('erro refresh');
      mensagem = 'Seção expirada!';
      this.router.navigate(['/login']);
    }
    else if (
        respostaErro instanceof HttpErrorResponse &&
        respostaErro.status >= 400 &&
        respostaErro.status <= 499) {

      mensagem = 'Ocorreu um erro ao processar a sua solicitação!';

      if (respostaErro.status === 403) {
        mensagem = 'Usuário sem autorização para esta ação!';
      }

      try {
        mensagem = respostaErro.error[0].mensagemUsuario;
      } catch (error) {
        console.error('Ocorreu um erro', respostaErro);
      }
    }
    else {
      mensagem = 'Erro ao processar o serviço remoto. Tente mais tarde novamente!';
      console.error('Ocorreu um erro!', respostaErro);
    }

    this.messageService.add({severity: 'error', detail: mensagem, life: 10000});
  }
}
