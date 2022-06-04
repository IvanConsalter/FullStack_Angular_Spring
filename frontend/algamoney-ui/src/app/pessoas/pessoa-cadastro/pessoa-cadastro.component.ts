import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  NgForm,
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

import { MessageService } from 'primeng/api';

import { PessoaService } from './../pessoa.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

import { Pessoa } from 'src/app/shared/model/pessoa.model';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css'],
})
export class PessoaCadastroComponent implements OnInit {
  pessoaForm: FormGroup;

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
    this.title.setTitle('Nova Pessoa');
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
        cidade: [null, this.validarObrigatoriedade],
        estado: [null, this.validarObrigatoriedade],
      }),
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
      .salvarPessoa(this.pessoaForm.value)
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
      .atualizarPessoa(this.pessoaForm.value)
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
        this.pessoaForm.patchValue(pessoa);
        this.atualizarTituloPagina();
      });
  }

  novaPessoa(): void {
    this.pessoaForm.reset(new Pessoa());
    this.router.navigate(['pessoas/novo']);
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
