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

  @Input() listContato: Array<Contato> = [];
  contatoForm: FormGroup;
  contatoIndex?: number = null;
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
      listContato: this.formBuilder.group({
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
    this.listContato.push(this.contatoForm.get('listContato').value);
    this.contatoForm.get('listContato').reset(new Contato());
    this.contatoIndex = null;
  }

  editarContato(): void {
    this.listContato[this.contatoIndex] = this.contatoForm.get('listContato').value;
    this.contatoForm.get('listContato').reset(new Contato());
    this.contatoIndex = null;
  }

  removerContato(rowIndex: number): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.listContato.splice(rowIndex, 1);
      }
    });
  }

  prepararEdicaoContato(contato: Contato, rowIndex: number): void {
    this.contatoIndex = rowIndex;
    this.exibirFormularioContato = true;
    this.contatoForm.get('listContato').patchValue(contato);
  }

  estaEditando(): boolean {
    if (this.contatoForm.get('listContato.codigo').value || this.contatoIndex !== null) {
      return true;
    }

    return false;
  }

  exibirModalContato(): void {
    this.exibirFormularioContato = true;
  }
}
