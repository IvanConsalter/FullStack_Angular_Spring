import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { DashboardService, MesReferenciaFiltro } from '../dashboard.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  mesReferenciaFiltro = new MesReferenciaFiltro();
  pieChartData: any;
  lineChartData: any;

  options = {
    tooltips: {
      callbacks: {
        label: (tooltipItem: any, data: any) => {
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const valor = dataset.data[tooltipItem.index];
          const label = dataset.label ? (dataset.label + ': ') : '';

          return label + this.decimalPipe.transform(valor, '1.2-2');
        }
      }
    }
  };

  constructor(
    private decimalPipe: DecimalPipe,
    private dashboardService: DashboardService,
    private erroHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.cnfigurarGraficoPizza();
    this.configurarGraficoLinha();
  }

  Pesquisar(event: any): void {
    this.mesReferenciaFiltro.mesReferencia = event;
    this.cnfigurarGraficoPizza();
    this.configurarGraficoLinha();
  }

  cnfigurarGraficoPizza(): void {
    this.dashboardService.lancamentosPorCategoria(this.mesReferenciaFiltro.mesReferencia)
      .then( resposta => {
        this.pieChartData = {
          labels: resposta.map(item => item.categoria.nome),
          datasets: [
            {
              data: resposta.map(item => item.total),
              backgroundColor: resposta.map(() => this.criarCor())
            }
          ]
        };
      })
      .catch( erro => this.erroHandler.mostrarErro(erro));
  }

  configurarGraficoLinha(): void {
    this.dashboardService.lancamentosPorDia(this.mesReferenciaFiltro.mesReferencia)
      .then( resposta => {
        const diasDoMes = this.configurarDiasMes();
        const totaisReceitas = this.totaisPorCadaDiaMes(resposta.filter(item => item.tipo === 'RECEITA'), diasDoMes);
        const totaisDepesas = this.totaisPorCadaDiaMes(resposta.filter(item => item.tipo === 'DESPESA'), diasDoMes);
        console.log(resposta);

        this.lineChartData = {
          labels: diasDoMes,
          datasets: [
            {
              label: 'Receitas',
              data: totaisReceitas,
              borderColor: '#3366CC'
            }, {
              label: 'Despesas',
              data: totaisDepesas,
              borderColor: '#D62B00'
            }
          ]
        };
      })
      .catch( erro => this.erroHandler.mostrarErro(erro));
  }

  private configurarDiasMes(): Array<number> {
    const mesReferencia = this.mesReferenciaFiltro.mesReferencia;

    mesReferencia.setMonth(mesReferencia.getMonth() + 1);
    mesReferencia.setDate(0);

    const quantidade = mesReferencia.getDate();
    const dias: Array<number> = [];

    for(let i = 1; i <= quantidade; i++) {
      dias.push(i);
    }

    return dias;
  }

  private totaisPorCadaDiaMes(dados: any, diasDoMes: Array<number>): Array<number> {
    const totais: Array<number> = [];

    for (const dia of diasDoMes) {
      let total = 0;

      for (const dado of dados) {
        if (dado.dia.getDate() === dia) {
          total = dado.total;
          break;
        }
      }

      totais.push(total);
    }

    return totais;
  }

  private criarCor(): string {
    const hexadecimal = Math.floor(Math.random() * 16777215).toString(16);
    const corHexadecimal = `#${hexadecimal}`;
    return corHexadecimal;
  }

}
