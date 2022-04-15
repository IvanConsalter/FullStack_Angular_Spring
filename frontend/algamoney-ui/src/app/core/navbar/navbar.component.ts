import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public mostrarMenu: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  public exibirMenu(): void {
    this.mostrarMenu = !this.mostrarMenu;
  }
}
