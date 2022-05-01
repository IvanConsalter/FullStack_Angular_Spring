import { Categoria } from './categoria.model';
import { Pessoa } from './pessoa.model';

export class Lancamento {
  codigo: number;
  observacao: string;
  tipo = 'RECEITA';
  dataPagamento: Date;
  dataVencimento: Date;
  valor: number;
  descricao: string;
  pessoa = new Pessoa();
  categoria = new Categoria();
}
