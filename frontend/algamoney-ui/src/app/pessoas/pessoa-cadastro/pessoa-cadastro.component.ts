import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { PessoaService } from './../pessoa.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

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
    private erroHandler: ErrorHandlerService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Nova Pessoa');
    const codigoPessoa = this.route.snapshot.params.codigo;

    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }

  }

  salvarPessoa(pessoaForm: NgForm): void {
    if(this.estaEditando()) {
      this.atualizarPessoa();
    }
    else {
      this.salvarNovaPessoa(pessoaForm);
    }
  }

  salvarNovaPessoa(pessoaForm: NgForm): void {
    this.pessoaService.salvarPessoa(this.pessoa)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Pessoa adicionada com sucesso!' });
        pessoaForm.reset();
        this.pessoa = new Pessoa();
      })
      .catch(erro => this.erroHandler.mostrarErro(erro));

  }

  atualizarPessoa(): void {
    this.pessoaService.atualizarPessoa(this.pessoa)
      .then( (pessoa) => {
        this.pessoa = pessoa;
        this.atualizarTituloPagina();
        this.messageService.add( { severity: 'success', detail: 'Pessoa atualizada com sucesso!', } );
      })
      .catch(erro => this.erroHandler.mostrarErro(erro));
  }

  carregarPessoa(codigoPessoa: number): void {
    this.pessoaService.consultarPessoaPorCodigo(codigoPessoa)
      .then( (pessoa) => {
        this.pessoa = pessoa;
        this.atualizarTituloPagina();
      });
  }

  novaPessoa(pessoaForm: NgForm): void {
    pessoaForm.reset(new Pessoa());
    this.router.navigate(['pessoas/novo']);
  }

  estaEditando(): boolean {
    if (this.pessoa.codigo) {
      return true;
    }

    return false;
  }

  atualizarTituloPagina(): void {
    this.title.setTitle(`Edição de Pessoa: ${this.pessoa.nome}`);
  }
}
