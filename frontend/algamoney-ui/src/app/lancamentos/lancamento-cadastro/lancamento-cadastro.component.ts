import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { SelectItem, MessageService } from 'primeng/api';

import { Lancamento } from './../../shared/model/lancamento.model';

import { LancamentoService } from './../lancamento.service';
import { PessoaService } from './../../pessoas/pessoa.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

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

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];
  mostrarSpinner = false;

  lancamentoForm: FormGroup;

  categorias: SelectItem[] = [ ];

  pessoas: SelectItem[] = [ ];

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private erroHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.configurarLancamentoForm();
    this.title.setTitle('Novo Lançamento');
    const codigoLancamento = this.route.snapshot.params.codigo;

    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

    this.consultarCategorias();
    this.consultarPessoas();
  }

  configurarLancamentoForm(): void {
    this.lancamentoForm = this.formBuilder.group({
      codigo: [],
      tipo: [ 'RECEITA', Validators.required ],
      dataVencimento: [null , Validators.required ],
      dataPagamento: [null],
      descricao: [ null , [ this.validarObrigatoriedade, this.validarTamanhoMinimo(5) ] ],
      valor: [ null, Validators.required ],
      categoria: this.formBuilder.group({
        codigo: [ null, Validators.required ],
        nome: []
      }),
      pessoa: this.formBuilder.group({
        codigo: [ null, Validators.required ],
        nome: []
      }),
      observacao: [],
      anexo: [],
      urlAnexo: []
    });
  }

  validarObrigatoriedade(input: FormControl): any {
    return (input.value ? null : { obrigatoriedade: true });
  }

  validarTamanhoMinimo(valorTamanho: number): any {
    return (input: FormControl) => {
      return (!input.value || input.value.length >= valorTamanho) ? null : { tamanhoMinimo: { tamanho: valorTamanho } };
    };
  }

  salvarLancamento(): void {
    if (this.estaEditando()) {
      this.atualizarLancamento();
    }
    else {
      this.salvarNovoLancamento();
    }
  }

  salvarNovoLancamento(): void {
    this.lancamentoService.salvarLancamento(this.lancamentoForm.value)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Lançamento adicionado com sucesso!', });
        this.lancamentoForm.reset(new Lancamento());
      })
      .catch(erro => this.erroHandler.mostrarErro(erro));

  }

  atualizarLancamento(): void {
    this.lancamentoService.atualizarLancamento(this.lancamentoForm.value)
      .then((lancamento: Lancamento) => {
        this.lancamentoForm.patchValue(lancamento);
        this.atualizarTituloPagina();
        this.messageService.add({ severity: 'success', detail: 'Lançamento atualizado com sucesso!', });
        this.router.navigate(['/lancamentos']);
      })
      .catch(erro => this.erroHandler.mostrarErro(erro));
  }

  carregarLancamento(codigoLancamento: number): void {
    this.lancamentoService.consultarLancamentoPorCodigo(codigoLancamento)
      .then( (lancamento) => {
        this.lancamentoForm.patchValue(lancamento);
        this.atualizarTituloPagina();
      })
      .catch(erro => this.erroHandler.mostrarErro(erro));
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

  novoLancamento(): void {
    this.lancamentoForm.reset(new Lancamento());
    this.router.navigate(['lancamentos/novo']);
  }

  estaEditando(): boolean {
    if (this.lancamentoForm.get('codigo').value) {
      return true;
    }

    return false;
  }

  atualizarTituloPagina(): void {
    this.title.setTitle(`Edição de lançamento: ${this.lancamentoForm.get('descricao').value}`);
  }

  antesUpload(event): void {
    this.mostrarSpinner = true;
  }

  aoTerminarUploadAnexo(event): void {
    const anexo = event.originalEvent.body;
    console.log(anexo);

    this.lancamentoForm.patchValue({
      anexo: anexo.nome,
      urlAnexo: (anexo.url as string).replace('\\', 'https://')
    });
    this.mostrarSpinner = false;
  }

  erroUpload(event): void {
    this.erroHandler.mostrarErro('Erro ao carregar anexo!');
    this.mostrarSpinner = false;
  }

  get nomeAnexo(): string {
    const nome = this.lancamentoForm.get('anexo').value;

    if (nome) {
      return nome.substring(nome.indexOf('_') + 1, nome.length);
    }

    return '';
  }

  get urlUploadAnexo(): string {
    return this.lancamentoService.urlUploadAnexo();
  }

  get uploadHeaders(): HttpHeaders {
    return this.lancamentoService.uploadHeaders();
  }

}
