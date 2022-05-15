import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class CategoriaFiltro {
  nome: string;
  pagina = 1;
  itensPorPagina: number;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriasUrl = 'http://localhost:8080/categorias';

  constructor(private http: HttpClient) { }

  consultarCategorias(filtro?: CategoriaFiltro): Promise<any> {

    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    if (!filtro) {
      filtro = new CategoriaFiltro();
    }

    filtro.itensPorPagina = 10;

    let params = new HttpParams();
    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(this.categoriasUrl, { headers, params })
      .toPromise()
      .then( (resposta: any) => resposta.content );
  }

}
