import { PessoaService } from './../../pessoas/pessoa.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  optionsConfig = {
    prefix: 'R$',
    thousands: '.',
    decimal: ',',
    allowNegative: false
  };

  pessoa: any;

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];

  categorias: SelectItem[] = [ ];

  pessoas: SelectItem[] = [ ];

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private erroHandler: ErrorHandlerService
    ) { }

  ngOnInit(): void {
    this.consultarCategorias();
    this.consultarPessoas();
  }

  consultarCategorias(): void {
    this.categoriaService.consultarCategorias()
      .then( (resposta) => {
        this.categorias = resposta.map((categoria) => {
          return { label: categoria.nome, value: categoria.codigo };
        });
      })
      .catch(erro => this.erroHandler.mostrarErro(erro));
  }

  consultarPessoas(): void {
    this.pessoaService.consultarPessoas()
      .then( (resposta) => {
        this.pessoas = resposta.map((pessoa) => {
          return { label: pessoa.nome, value: pessoa.codigo };
        });
      })
      .catch(erro => this.erroHandler.mostrarErro(erro));
  }

}
