import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  lancamentosUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
  }

  lancamentosPorCategoria(): Promise<Array<any>> {
    return this.http.get(`${this.lancamentosUrl}/estatisticas/por-categoria`)
      .toPromise()
      .then( (resposta: any) => {
        console.log(resposta);
        return resposta;
      });
  }

  lancamentosPorDia(): Promise<Array<any>> {
    return this.http.get(`${this.lancamentosUrl}/estatisticas/por-dia`)
      .toPromise()
      .then( (resposta: any) => {
        console.log(resposta);

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
