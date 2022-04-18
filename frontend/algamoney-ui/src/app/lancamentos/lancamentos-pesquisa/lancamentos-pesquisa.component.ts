import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  lancamentos: any[] = [];
  filtro = new LancamentoFiltro();

  constructor(
    private lancamentoService: LancamentoService
  ) { }

  ngOnInit(): void {
    this.consultar();
  }

  consultar(): void {
    this.lancamentoService.consultarLancamentos(this.filtro)
      .then(resposta => {
        this.lancamentos = resposta.lancamentos;
      });
  }

}
