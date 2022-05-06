import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { SelectItem, MessageService } from 'primeng/api';

import { Lancamento } from './../../shared/model/lancamento.model';

import { LancamentoService } from './../lancamento.service';
import { PessoaService } from './../../pessoas/pessoa.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  optionsConfig = {
    prefix: 'R$',
    thousands: '.',
    decimal: ',',
    allowNegative: false
  };

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];

  lancamento = new Lancamento();

  categorias: SelectItem[] = [ ];

  pessoas: SelectItem[] = [ ];

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private erroHandler: ErrorHandlerService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    const codigoLancamento = this.route.snapshot.params.codigo;

    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

    this.consultarCategorias();
    this.consultarPessoas();
  }

  salvarLancamento(lancamentoForm: NgForm) {
    if (this.estaEditando()) {
      this.atualizarLancamento(lancamentoForm);
    }
    else {
      this.salvarNovoLancamento(lancamentoForm);
    }
  }

  salvarNovoLancamento(lancamentoForm: NgForm): void {
    this.lancamentoService.salvarLancamento(this.lancamento)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Lançamento adicionado com sucesso!', });
        lancamentoForm.reset();
        this.lancamento = new Lancamento();
      })
      .catch(erro => this.erroHandler.mostrarErro(erro));

  }

  atualizarLancamento(lancamentoForm: NgForm): void {
    this.lancamentoService.atualizarLancamento(this.lancamento)
      .then((lancamento) => {
        this.lancamento = lancamento;
        this.messageService.add({ severity: 'success', detail: 'Lançamento atualizado com sucesso!', });
      })
      .catch(erro => this.erroHandler.mostrarErro(erro));
  }

  carregarLancamento(codigoLancamento: number): void {
    this.lancamentoService.consultarLancamentoPorCodigo(codigoLancamento)
      .then( (lancamento) => {
        this.lancamento = lancamento;
      })
      .catch(erro => this.erroHandler.mostrarErro(erro));
  }

  consultarCategorias(): void {
    this.categoriaService.consultarCategorias()
      .then( (resposta) => {
        this.categorias = resposta.map((categoria) => {
          return { label: categoria.nome, value: categoria.codigo };
        });
      })
      .catch(erro => this.erroHandler.mostrarErro(erro));
  }

  consultarPessoas(): void {
    this.pessoaService.consultarPessoas()
      .then( (resposta) => {
        this.pessoas = resposta.map((pessoa) => {
          return { label: pessoa.nome, value: pessoa.codigo };
        });
      })
      .catch(erro => this.erroHandler.mostrarErro(erro));
  }

  estaEditando(): boolean {
    if (this.lancamento.codigo) {
      return true;
    }

    return false;
  }

}
