import { PessoaService, PessoaFiltro } from './../pessoa.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new PessoaFiltro();
  pessoas = [];

  constructor(
    private pessoaService: PessoaService
  ) { }

  ngOnInit(): void {
    // this.consultarPessoas();
    // this.consultarPessoasPorFiltro();
  }

  consultarPessoas(): void {
    this.pessoaService.consultarPessoas()
      .then(pessoas => this.pessoas = pessoas
    );
  }

  consultarPessoasPorFiltro(pagina = 0): void {

    this.filtro.pagina = pagina;

    this.pessoaService.consultarPessoasPorFiltro(this.filtro)
      .then((resposta: any) => {
        // console.log(resposta);
        // console.log(this.filtro);

        this.pessoas = resposta.pessoas;
        this.totalRegistros = resposta.totalRegistros;
      });
  }

  mudarPagina(evento) {
    const pagina = evento.first / evento.rows;
    this.consultarPessoasPorFiltro(pagina);
  }

}
