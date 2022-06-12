import { DatePipe } from '@angular/common';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  lancamentosUrl = `${environment.apiUrl}/lancamentos`;

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe
  ) { }

  relatorioLancamentoPorPessoa(periodoInicio: Date, periodoFim: Date): Promise<any> {
    let params = new HttpParams();
    params = params.set('inicio', this.datePipe.transform(periodoInicio, 'YYYY-MM-dd'));
    params = params.set('fim', this.datePipe.transform(periodoFim, 'YYYY-MM-dd'));

    return this.http.get(`${this.lancamentosUrl}/relatorios/por-pessoa`, { params, responseType: 'blob' })
      .toPromise();
  }
}
