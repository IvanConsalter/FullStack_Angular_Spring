import { Endereco } from "./endereco.model";

export class Pessoa {
  codigo: number;
  nome: string;
  ativo: boolean;
  endereco = new Endereco();
}
