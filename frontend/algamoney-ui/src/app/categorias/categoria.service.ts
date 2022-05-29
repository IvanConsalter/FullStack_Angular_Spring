import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriasUrl = `${environment.apiUrl}/categorias`;

  constructor(private http: HttpClient) { }

  consultarCategorias(): Promise<any> {

    return this.http.get(this.categoriasUrl)
      .toPromise();
  }
}
