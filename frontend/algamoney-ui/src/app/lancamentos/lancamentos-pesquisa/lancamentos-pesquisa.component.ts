import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import {
  LazyLoadEvent,
  MessageService,
  ConfirmationService,
} from 'primeng/api';

import { LancamentoService, LancamentoFiltro } from './../lancamento.service';

import { ErrorHandlerService } from './../../core/error-handler.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css'],
})
export class LancamentosPesquisaComponent implements OnInit {
  totalRegistros = 0;
  lancamentos: any[] = [];
  filtro = new LancamentoFiltro();
  @ViewChild('tabela') tabela;

  constructor(
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private erroHandler: ErrorHandlerService,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de lançamentos');
  }

  consultar(pagina = 0): void {
    this.filtro.pagina = pagina;

    this.lancamentoService
      .consultarLancamentos(this.filtro)
      .then((resposta) => {
        // console.log(resposta);
        // if (this.filtro.pagina === 0) {
        //   this.tabela.reset();
        // } // bug infinito na consulta

        this.totalRegistros = resposta.totalElementos;
        this.lancamentos = resposta.lancamentos;
      })
      .catch(erro => this.erroHandler.mostrarErro(erro));
  }

  confirmarExclusao(lancamento: any): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(lancamento);
      },
    });
  }

  excluir(lancamento: any): void {
    this.lancamentoService.excluirLancamento(lancamento.codigo)
      .then(() => {
        this.tabela.reset();
        this.messageService.add({
          severity: 'success',
          detail: 'Lançamento excluído com sucesso!',
        });
      })
      .catch(erro => this.erroHandler.mostrarErro(erro));
  }

  aoMudarPagina(evento: LazyLoadEvent): void {
    const pagina = evento.first / evento.rows;
    this.consultar(pagina);
  }
}
