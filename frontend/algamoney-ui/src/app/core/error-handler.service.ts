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
    else {
      mensagem = 'Erro ao processar o serviço remoto. Tente mais tarde novamente!';
      console.log('Ocorreu um erro!', respostaErro);
    }

    this.messageService.add({severity: 'error', detail: mensagem, life: 10000});
  }
}
