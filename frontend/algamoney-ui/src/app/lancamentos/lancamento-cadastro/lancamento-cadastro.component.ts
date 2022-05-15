import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { SelectItem, MessageService } from 'primeng/api';

import { Lancamento } from './../../shared/model/lancamento.model';

import { LancamentoService } from './../lancamento.service';
import { PessoaService } from './../../pessoas/pessoa.service';
import { CategoriaFiltro, CategoriaService } from './../../categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Title } from '@angular/platform-browser';

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
  filtroCategoria: CategoriaFiltro;

  pessoas: SelectItem[] = [ ];

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private erroHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
    ) { }

  ngOnInit(): void {
    this.title.setTitle('Novo Lançamento');
    const codigoLancamento = this.route.snapshot.params.codigo;

    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

    this.consultarCategorias();
    this.consultarPessoas();
  }

  salvarLancamento(lancamentoForm: NgForm): void {
    if (this.estaEditando()) {
      this.atualizarLancamento();
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

  atualizarLancamento(): void {
    this.lancamentoService.atualizarLancamento(this.lancamento)
      .then((lancamento) => {
        this.lancamento = lancamento;
        this.atualizarTituloPagina();
        this.messageService.add({ severity: 'success', detail: 'Lançamento atualizado com sucesso!', });
      })
      .catch(erro => this.erroHandler.mostrarErro(erro));
  }

  carregarLancamento(codigoLancamento: number): void {
    this.lancamentoService.consultarLancamentoPorCodigo(codigoLancamento)
      .then( (lancamento) => {
        this.lancamento = lancamento;
        this.atualizarTituloPagina();
      })
      .catch(erro => this.erroHandler.mostrarErro(erro));
  }

  consultarCategorias(filtro?: CategoriaFiltro): void {
    this.categoriaService.consultarCategorias(filtro)
      .then( (resposta) => {
        this.categorias = resposta.map((categoria) => {
          return { label: categoria.nome, value: categoria.codigo };
        });
      })
      .catch(erro => this.erroHandler.mostrarErro(erro));
  }

  aoFiltrarCategoria(event?: any): void {
    this.filtroCategoria = new CategoriaFiltro();

    if (event) {
      this.filtroCategoria.nome = event.filter;
    }

    this.consultarCategorias(this.filtroCategoria);
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

  novoLancamento(lancamentoForm: NgForm): void {
    lancamentoForm.reset(new Lancamento());
    this.router.navigate(['lancamentos/novo']);
  }

  estaEditando(): boolean {
    if (this.lancamento.codigo) {
      return true;
    }

    return false;
  }

  atualizarTituloPagina(): void {
    this.title.setTitle(`Edição de lançamento: ${this.lancamento.descricao}`);
  }

  onScroll(event: any): void {
    console.log(event);
  }

}
