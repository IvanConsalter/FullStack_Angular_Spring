import { LazyLoadEvent, MessageService } from 'primeng/api';
import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  lancamentos: any[] = [];
  filtro = new LancamentoFiltro();
  @ViewChild('tabela') tabela;

  constructor(
    private lancamentoService: LancamentoService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }

  consultar(pagina = 0): void {
    this.filtro.pagina = pagina;

    this.lancamentoService.consultarLancamentos(this.filtro)
      .then(resposta => {
        // console.log(resposta);
        this.totalRegistros = resposta.totalElementos;
        this.lancamentos = resposta.lancamentos;
      });
  }

  excluir(lancamento: any): void {
    this.lancamentoService.excluirLancamento(lancamento.codigo)
      .then(() => {
        this.tabela.reset();
        this.messageService.add({ severity: 'success', detail: 'Lançamento excluído com sucesso!' });
      });
  }

  aoMudarPagina(evento: LazyLoadEvent): void {
    const pagina = evento.first / evento.rows;
    this.consultar(pagina);
  }

}
