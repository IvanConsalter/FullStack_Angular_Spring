import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class LancamentoService {
  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient) { }

  consultarLancamentos(): Promise<any> {

    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(`${this.lancamentosUrl}?resumo`, { headers })
      .toPromise()
      .then((response: any) => {
        // console.log(response);
        return response.content;
      });
  }
}
