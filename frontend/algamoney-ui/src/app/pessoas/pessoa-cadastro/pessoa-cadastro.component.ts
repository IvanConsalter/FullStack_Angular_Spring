import { Contato } from './../../shared/model/contato.model';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

import { ConfirmationService, MessageService } from 'primeng/api';

import { PessoaService } from './../pessoa.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

import { Pessoa } from 'src/app/shared/model/pessoa.model';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css'],
})
export class PessoaCadastroComponent implements OnInit {
  exibirFormularioContato = false;
  pessoaForm: FormGroup;
  contatoForm: FormGroup;
  contatos = [];
  contatoIndex?: number;

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private erroHandler: ErrorHandlerService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.configurarPessoaForm();
    this.configurarContatoForm();
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
      })
    });
  }

  configurarContatoForm(): void {
    this.contatoForm = this.formBuilder.group({
      contatos: this.formBuilder.group({
        codigo: [],
        nome: [null, [this.validarObrigatoriedade]],
        email: [null, [this.validarObrigatoriedade, Validators.email]],
        telefone: [null]
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
      .salvarPessoa(this.pessoaForm.value, this.contatos)
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
      .atualizarPessoa(this.pessoaForm.value, this.contatos)
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

  confirmarContato(): void {
    if (this.contatoForm.get('contatos.codigo').value){
      this.editarContato();
    }
    else {
      this.salvarNovoContato();
    }
    this.exibirFormularioContato = false;
  }

  salvarNovoContato(): void {
    this.contatos.push(this.contatoForm.get('contatos').value);
    this.contatoForm.get('contatos').reset(new Contato());
  }

  editarContato(): void {
    this.contatos[this.contatoIndex] = this.contatoForm.get('contatos').value;
    this.contatoForm.get('contatos').reset(new Contato());
  }

  removerContato(rowIndex: number): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.contatos.splice(rowIndex, 1);
      }
    });
  }

  prepararEdicaoContato(contato: Contato, rowIndex: number): void {
    this.contatoIndex = rowIndex;
    this.exibirFormularioContato = true;
    this.contatoForm.get('contatos').patchValue(contato);
  }

  carregarPessoa(codigoPessoa: number): void {
    this.pessoaService
      .consultarPessoaPorCodigo(codigoPessoa)
      .then((pessoa: Pessoa) => {
        this.contatos = pessoa.contatos;
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

  exibirModalContato(): void {
    this.exibirFormularioContato = true;
  }
}
