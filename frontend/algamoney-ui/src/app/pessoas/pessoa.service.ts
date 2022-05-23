import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pessoa } from '../shared/model/pessoa.model';

export class PessoaFiltro {
  nome: string;
  itensPorPagina = 4;
  pagina = 0;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl = 'http://localhost:8080/pessoas';

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

  salvarPessoa(pessoa: Pessoa): Promise<Pessoa> {

    return this.http.post<Pessoa>(this.pessoasUrl, pessoa)
      .toPromise<Pessoa>();
  }

  atualizarPessoa(pessoa: Pessoa): Promise<Pessoa> {

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
}
