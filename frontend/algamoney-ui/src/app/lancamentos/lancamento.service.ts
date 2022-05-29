import { DatePipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Lancamento } from '../shared/model/lancamento.model';

import { environment } from './../../environments/environment';

export class LancamentoFiltro {
  descricao?: string;
  dataVencimentoInicio?: Date;
  dataVencimentoFim?: Date;
  pagina = 1;
  itensPorPagina = 4;
}


@Injectable({
  providedIn: 'root',
})
export class LancamentoService {
  lancamentosUrl = `${environment.apiUrl}/lancamentos`;

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe
  ) { }

  consultarLancamentos(filtro: LancamentoFiltro): Promise<any> {

    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if(filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    if(filtro.dataVencimentoInicio) {
      params = params.set('dataVencimentoDe', this.datePipe.transform(filtro.dataVencimentoInicio, 'yyyy-MM-dd'));
    }

    if(filtro.dataVencimentoFim) {
      params = params.set('dataVencimentoAte', this.datePipe.transform(filtro.dataVencimentoFim, 'yyyy-MM-dd'));
    }

    return this.http.get(`${this.lancamentosUrl}?resumo`, { params })
      .toPromise()
      .then((response: any) => {
        // console.log(response);
        const resultado = {
          lancamentos: response.content,
          totalElementos: response.totalElements
        };

        return resultado;
      });
  }

  consultarLancamentoPorCodigo(codigo: number): Promise<Lancamento> {

    return this.http.get(`${this.lancamentosUrl}/${codigo}`)
      .toPromise()
      .then((response: any) => {
        this.converterStringParaData([response]);
        return response;
      });
  }

  salvarLancamento(lancamento: Lancamento): Promise<Lancamento> {

    return this.http.post<Lancamento>(this.lancamentosUrl, lancamento)
      .toPromise<Lancamento>();
  }

  atualizarLancamento(lancamento: Lancamento): Promise<Lancamento> {

    return this.http.put<Lancamento>(`${this.lancamentosUrl}/${lancamento.codigo}`, lancamento)
      .toPromise();
  }

  excluirLancamento(codigo: number): Promise<void> {

    return this.http.delete(`${this.lancamentosUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  private converterStringParaData(lancamentos: Lancamento[]): void {
    for (const lancamento of lancamentos) {
      const offset = new Date().getTimezoneOffset() * 60000;

      lancamento.dataVencimento = new Date(new Date(lancamento.dataVencimento).getTime() + offset);

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = new Date(new Date(lancamento.dataPagamento).getTime() + offset);
      }
    }
  }
}
