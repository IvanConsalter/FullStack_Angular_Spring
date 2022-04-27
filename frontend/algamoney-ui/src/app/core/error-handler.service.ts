import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private messageService: MessageService
  ) { }

  mostrarErro(respostaErro: any): void {
    let mensagem: string;

    if (typeof respostaErro === 'string') {
      mensagem = respostaErro;
    }
    else if (
        respostaErro instanceof HttpErrorResponse &&
        respostaErro.status >= 400 &&
        respostaErro.status <= 499) {
      mensagem = 'Ocorreu um erro ao processar a sua solicitação!';

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
