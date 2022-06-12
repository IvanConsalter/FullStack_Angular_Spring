import { Endereco } from './endereco.model';
import { Contato } from './contato.model';

export class Pessoa {
  codigo: number;
  nome: string;
  ativo = true;
  endereco = new Endereco();
  contatos = new Array<Contato>();
}
