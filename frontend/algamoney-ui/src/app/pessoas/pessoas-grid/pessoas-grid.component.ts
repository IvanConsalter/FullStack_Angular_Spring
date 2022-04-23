import { LazyLoadEvent } from 'primeng/api';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pessoas-grid',
  templateUrl: './pessoas-grid.component.html',
  styleUrls: ['./pessoas-grid.component.css']
})
export class PessoasGridComponent implements OnInit {

  @Input() pessoas = [];
  @Input() filtro;
  @Input() totalRegistros;
  @Output() lazyLoad = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  aoMudarPagina(event: LazyLoadEvent) {
    this.lazyLoad.emit(event);
  }

}
