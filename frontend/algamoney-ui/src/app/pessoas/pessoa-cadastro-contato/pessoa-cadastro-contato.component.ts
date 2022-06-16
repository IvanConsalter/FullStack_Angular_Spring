import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ConfirmationService } from 'primeng/api';

import { Contato } from 'src/app/shared/model/contato.model';

@Component({
  selector: 'app-pessoa-cadastro-contato',
  templateUrl: './pessoa-cadastro-contato.component.html',
  styleUrls: ['./pessoa-cadastro-contato.component.css']
})
export class PessoaCadastroContatoComponent implements OnInit {

  @Input() contatos: Array<Contato> = [];
  contatoForm: FormGroup;
  contatoIndex?: number;
  exibirFormularioContato = false;

  constructor(
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.configurarContatoForm();
  }

  configurarContatoForm(): void {
    this.contatoForm = this.formBuilder.group({
      contatos: this.formBuilder.group({
        codigo: [],
        nome: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email]],
        telefone: [null]
      })
    });
  }

  confirmarContato(): void {
    if (this.estaEditando()){
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

  estaEditando(): boolean {
    if (this.contatoForm.get('contatos.codigo').value) {
      return true;
    }

    return false;
  }

  exibirModalContato(): void {
    this.exibirFormularioContato = true;
  }
}
