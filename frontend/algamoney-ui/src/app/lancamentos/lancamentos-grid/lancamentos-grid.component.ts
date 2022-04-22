import { LazyLoadEvent } from 'primeng/api';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-lancamentos-grid',
  templateUrl: './lancamentos-grid.component.html',
  styleUrls: ['./lancamentos-grid.component.css']
})
export class LancamentosGridComponent implements OnInit {

  @Input() lancamentos = [];
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
