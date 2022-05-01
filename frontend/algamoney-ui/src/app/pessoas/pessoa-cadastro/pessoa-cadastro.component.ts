import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { MessageService } from 'primeng/api';
import { PessoaService } from './../pessoa.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Pessoa } from 'src/app/shared/model/pessoa.model';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private erroHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
  }

  salvarPessoa(pessoaForm: NgForm) {
    this.pessoaService.salvarPessoa(this.pessoa)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Pessoa adicionada com sucesso!' });
        pessoaForm.reset();
        this.pessoa = new Pessoa();
      })
      .catch(erro => this.erroHandler.mostrarErro(erro));

  }

}
