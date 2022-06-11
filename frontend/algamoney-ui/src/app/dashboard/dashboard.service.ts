import { DatePipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

export class MesReferenciaFiltro {
  mesReferencia: Date = new Date();
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  lancamentosUrl: string;

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe
  ) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
  }

  lancamentosPorCategoria(mesReferencia: any): Promise<Array<any>> {
    let params = new HttpParams();
    params = params.set('mesReferencia', this.datePipe.transform(mesReferencia, 'yyyy-MM-dd'));

    return this.http.get(`${this.lancamentosUrl}/estatisticas/por-categoria`, { params })
      .toPromise()
      .then( (resposta: any) => {
        return resposta;
      });
  }

  lancamentosPorDia(mesReferencia: any): Promise<Array<any>> {
    let params = new HttpParams();
    params = params.set('mesReferencia', this.datePipe.transform(mesReferencia, 'yyyy-MM-dd'));

    return this.http.get(`${this.lancamentosUrl}/estatisticas/por-dia`, { params })
      .toPromise()
      .then( (resposta: any) => {
        const dados = resposta;
        this.converterStringParaData(dados);
        return dados;
      });
  }

  private converterStringParaData(dados: Array<any>): void {
    for (const dado of dados) {
      const offset = new Date().getTimezoneOffset() * 60000;

      dado.dia = new Date(new Date(dado.dia).getTime() + offset);
    }
  }
}
