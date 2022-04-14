import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  pessoas = [
    { nome: 'Manoel Pinheiro', cidade: 'Uberlândia', estado: 'MG', status: true },
    { nome: 'Sebastião da Silva', cidade: 'São Paulo', estado: 'SP', status: false },
    { nome: 'Carla Souza', cidade: 'Florianópolis', estado: 'SC', status: true },
    { nome: 'Luís Pereira', cidade: 'Curitiba', estado: 'PR', status: true },
    { nome: 'Vilmar Andrade', cidade: 'Rio de Janeiro', estado: 'RJ', status: false },
    { nome: 'Paula Maria', cidade: 'Uberlândia', estado: 'MG', status: true }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
