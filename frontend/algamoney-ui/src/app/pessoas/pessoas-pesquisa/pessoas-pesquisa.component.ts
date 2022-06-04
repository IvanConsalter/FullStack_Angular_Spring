import { ErrorHandlerService } from './../../core/error-handler.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { PessoaService, PessoaFiltro } from './../pessoa.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new PessoaFiltro();
  pessoas = [];
  @ViewChild('tabela') tabela;

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private confirmatiomSerive: ConfirmationService,
    private erroHandler: ErrorHandlerService,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de Pessoas');
  }

  consultarPessoas(): void {
    this.pessoaService.consultarPessoas()
      .then(pessoas => this.pessoas = pessoas)
      .catch(erro => this.erroHandler.mostrarErro(erro));
  }

  consultarPessoasPorFiltro(pagina = 0): void {

    this.filtro.pagina = pagina;

    this.pessoaService.consultarPessoasPorFiltro(this.filtro)
      .then((resposta: any) => {
        // console.log(resposta);
        // console.log(this.filtro);
        // if (this.filtro.pagina === 0) {
        //   this.tabela.reset();
        // } // bug infinito na consulta

        this.pessoas = resposta.pessoas;
        this.totalRegistros = resposta.totalRegistros;
      })
      .catch(erro => this.erroHandler.mostrarErro(erro));
  }

  confirmarExclusao(pessoa: any): void {
    this.confirmatiomSerive.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }

  excluir(pessoa: any): void {
    this.pessoaService.excluirPessoa(pessoa.codigo)
      .then( () => {
        this.tabela.reset();
        this.messageService.add({ severity: 'success', detail: 'Pessoa excluída com sucesso!' });
      })
      .catch(erro => this.erroHandler.mostrarErro(erro));
  }

  aoMudarPagina(evento): void {
    const pagina = evento.first / evento.rows;
    this.consultarPessoasPorFiltro(pagina);
  }

  alterarStatusPessoa(pessoa: any): void {

    const novoStatus = !pessoa.ativo;

    this.pessoaService.alterarStatusPessoa(pessoa.codigo, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'ativada' : 'desativada';

        pessoa.ativo = novoStatus;
        this.messageService.add({severity: 'success', detail: `Pessoa ${acao} com sucesso!`});
      })
      .catch(erro => this.erroHandler.mostrarErro(erro));
  }

}
