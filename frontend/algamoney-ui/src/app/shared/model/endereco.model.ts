import { Cidade } from './cidade.model';

export class Endereco {
  cidade = new Cidade();
  complemento: string;
  numero: string;
  logradouro: string;
  bairro: string;
  cep: string;
}
