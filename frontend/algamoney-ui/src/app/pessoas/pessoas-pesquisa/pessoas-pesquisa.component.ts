import { PessoaService, PessoaFiltro } from './../pessoa.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  filtro = new PessoaFiltro();
  pessoas = [];

  constructor(
    private pessoaService: PessoaService
  ) { }

  ngOnInit(): void {
    // this.consultarPessoas();
    this.consultarPessoasPorFiltro();
  }

  consultarPessoas(): void {
    this.pessoaService.consultarPessoas()
      .then(pessoas => this.pessoas = pessoas
    );
  }

  consultarPessoasPorFiltro(): void {

    this.pessoaService.consultarPessoasPorFiltro(this.filtro)
      .then((resposta: any) => {
        console.log(resposta);
        console.log(this.filtro);

        this.pessoas = resposta.pessoas;
      });
  }

}
