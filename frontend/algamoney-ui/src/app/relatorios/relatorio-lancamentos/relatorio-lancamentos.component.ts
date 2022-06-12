import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

import { RelatoriosService } from './../relatorios.service';

@Component({
  selector: 'app-relatorio-lancamentos',
  templateUrl: './relatorio-lancamentos.component.html',
  styleUrls: ['./relatorio-lancamentos.component.css']
})
export class RelatorioLancamentosComponent implements OnInit {

  periodoInicio: Date;
  periodoFim: Date;

  constructor(
    private relatoriosService: RelatoriosService,
    private erroHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
  }

  gerarRelatorioLancamento(): void {
    if (this.periodoInicio > this.periodoFim) {
      this.erroHandler.mostrarErro('Data início precisar ser menor que data final!');
      return;
    }

    this.relatoriosService.relatorioLancamentoPorPessoa(this.periodoInicio, this.periodoFim)
      .then( (relatorio) => {
        const url = window.URL.createObjectURL(relatorio);
        window.open(url);
      })
      .catch(erro => this.erroHandler.mostrarErro(erro));
  }

}
