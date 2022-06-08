import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  pieChartData: any;

  lineChartData = {
    labels: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    datasets: [
      {
        label: 'Receitas',
        data: [4, 10, 18, 5, 1, 20, 3],
        borderColor: '#3366CC'
      }, {
        label: 'Despesas',
        data: [10, 15, 8, 5, 1, 7, 9],
        borderColor: '#D62B00'
      }
    ]
  };

  constructor(
    private dashboardService: DashboardService,
    private erroHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.cnfigurarGraficoPizza();
    this.configurarGraficoLinha();
  }

  cnfigurarGraficoPizza(): void {
    this.dashboardService.lancamentosPorCategoria()
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
    this.dashboardService.lancamentosPorDia()
      .then( resposta => console.log(resposta))
      .catch( erro => this.erroHandler.mostrarErro(erro));
  }

  criarCor(): string {
    const hexadecimal = Math.floor(Math.random() * 16777215).toString(16);
    const corHexadecimal = `#${hexadecimal}`;
    return corHexadecimal;
  }

}
