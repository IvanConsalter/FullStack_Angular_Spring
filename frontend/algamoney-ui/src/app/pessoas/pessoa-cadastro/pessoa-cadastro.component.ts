import { Contato } from './../../shared/model/contato.model';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
} from '@angular/forms';

import { MessageService, SelectItem } from 'primeng/api';

import { PessoaService } from './../pessoa.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

import { Pessoa } from 'src/app/shared/model/pessoa.model';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css'],
})
export class PessoaCadastroComponent implements OnInit {

  pessoa: Pessoa;
  pessoaForm: FormGroup;
  listContato: Array<Contato> = [];
  cidades: SelectItem[];
  estados: SelectItem[];
  estadoSelecionado: number | undefined;

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private erroHandler: ErrorHandlerService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.configurarPessoaForm();
    this.carregarEstados();
    const codigoPessoa = this.route.snapshot.params.codigo;

    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }
  }

  configurarPessoaForm(): void {
    this.pessoaForm = this.formBuilder.group({
      codigo: [],
      ativo: [true],
      nome: [null, [this.validarObrigatoriedade, this.validarTamanhoMinimo(5)]],
      endereco: this.formBuilder.group({
        cep: [null, this.validarObrigatoriedade],
        cidade: this.formBuilder.group({
          codigo: [null, this.validarObrigatoriedade],
          nome: [],
          estado: this.formBuilder.group({
            codigo: [null, this.validarObrigatoriedade],
            nome: []
          })
        }),
        bairro: [
          null,
          [this.validarObrigatoriedade, this.validarTamanhoMinimo(5)],
        ],
        complemento: [null],
        logradouro: [
          null,
          [this.validarObrigatoriedade, this.validarTamanhoMinimo(5)],
        ],
        numero: [null, this.validarObrigatoriedade],
      })
    });
  }

  validarObrigatoriedade(input: FormControl): any {
    return input.value ? null : { obrigatoriedade: true };
  }

  validarTamanhoMinimo(valorTamanho: number): any {
    return (input: FormControl) => {
      return !input.value || input.value.length >= valorTamanho
        ? null
        : { tamanhoMinimo: { tamanho: valorTamanho } };
    };
  }

  salvarPessoa(): void {
    if (this.estaEditando()) {
      this.atualizarPessoa();
    } else {
      this.salvarNovaPessoa();
    }
  }

  salvarNovaPessoa(): void {
    this.pessoaService
      .salvarPessoa(this.pessoaForm.value, this.listContato)
      .then(() => {
        this.messageService.add({
          severity: 'success',
          detail: 'Pessoa adicionada com sucesso!',
        });
        this.pessoaForm.reset(new Pessoa());
      })
      .catch((erro) => this.erroHandler.mostrarErro(erro));
  }

  atualizarPessoa(): void {
    this.pessoaService
      .atualizarPessoa(this.pessoaForm.value, this.listContato)
      .then((pessoa: Pessoa) => {
        this.pessoaForm.patchValue(pessoa);
        this.atualizarTituloPagina();
        this.messageService.add({
          severity: 'success',
          detail: 'Pessoa atualizada com sucesso!',
        });
        this.router.navigate(['/pessoas']);
      })
      .catch((erro) => this.erroHandler.mostrarErro(erro));
  }

  carregarPessoa(codigoPessoa: number): void {
    this.pessoaService
      .consultarPessoaPorCodigo(codigoPessoa)
      .then((pessoa: Pessoa) => {
        this.listContato = pessoa.listContato;
        this.estadoSelecionado = pessoa.endereco.cidade.estado.codigo;
        this.carregarCidades();
        this.pessoaForm.patchValue(pessoa);
        this.atualizarTituloPagina();
      });
  }

  novaPessoa(): void {
    this.pessoaForm.reset(new Pessoa());
    this.router.navigate(['pessoas/novo']);
  }

  carregarEstados(): void {
    this.pessoaService.consultarEstados()
      .then( resposta => {
        this.estados = resposta.map( estado => {
          return { label: estado.nome, value: estado.codigo };
        });
      })
      .catch(erro => this.erroHandler.mostrarErro(erro));
  }

  carregarCidades(): void {
    this.pessoaService.consultarCidades(this.estadoSelecionado)
      .then( resposta => {
        this.cidades = resposta.map( cidade => {
          return { label: cidade.nome, value: cidade.codigo };
        });
      });
  }

  estaEditando(): boolean {
    if (this.pessoaForm.get('codigo').value) {
      return true;
    }

    return false;
  }

  atualizarTituloPagina(): void {
    this.title.setTitle(
      `Edição de Pessoa: ${this.pessoaForm.get('nome').value}`
    );
  }

}
