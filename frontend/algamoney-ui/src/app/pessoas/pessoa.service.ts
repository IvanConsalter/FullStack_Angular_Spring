import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cidade } from '../shared/model/cidade.model';
import { Contato } from '../shared/model/contato.model';
import { Estado } from '../shared/model/estado.model';

import { Pessoa } from '../shared/model/pessoa.model';

import { environment } from './../../environments/environment';

export class PessoaFiltro {
  nome: string;
  itensPorPagina = 4;
  pagina = 0;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl = `${environment.apiUrl}/pessoas`;
  estadosUrl = `${environment.apiUrl}/estados`;
  cidadesUrl = `${environment.apiUrl}/cidades`;

  constructor(
    private http: HttpClient
  ) { }

  consultarPessoasPorFiltro(filtro: PessoaFiltro): Promise<any> {

    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(this.pessoasUrl, { params })
      .toPromise()
      .then((response: any) => {

        const pessoas = response.content;

        const resultado = {
          pessoas,
          totalRegistros: response.totalElements
        };

        return resultado;
      });
  }

  consultarPessoas(): Promise<any> {

    return this.http.get(this.pessoasUrl)
      .toPromise()
      .then((response: any) => {
        return response.content;
      });
  }

  consultarPessoaPorCodigo(codigo: number): Promise<Pessoa> {

    return this.http.get<Pessoa>(`${this.pessoasUrl}/${codigo}`)
      .toPromise();
  }

  salvarPessoa(pessoa: Pessoa, listContato: Array<Contato>): Promise<Pessoa> {
    pessoa.listContato = listContato;

    return this.http.post<Pessoa>(this.pessoasUrl, pessoa)
      .toPromise<Pessoa>();
  }

  atualizarPessoa(pessoa: Pessoa, listContato: Array<Contato>): Promise<Pessoa> {
    pessoa.listContato = listContato;

    return this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.codigo}`, pessoa)
      .toPromise();
  }

  excluirPessoa(codigo: number): Promise<void> {

    return this.http.delete(`${this.pessoasUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  alterarStatusPessoa(codigo: number, ativo: boolean): Promise<any> {

    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo)
      .toPromise();
  }

  consultarEstados(): Promise<Array<Estado>> {
    return this.http.get<Array<Estado>>(this.estadosUrl)
      .toPromise();
  }

  consultarCidades(estadoId: number): Promise<Array<Cidade>> {
    let params = new HttpParams();
    params = params.set('estadoCodigo', estadoId.toString());

    return this.http.get<Array<Cidade>>(this.cidadesUrl, { params })
      .toPromise();
  }
}
