import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']/*,
  encapsulation: ViewEncapsulation.None*/
})
export class HomeComponent implements OnInit {
  toggled: boolean;
  items: MenuItem[];

  constructor() { }

  ngOnInit() {
    this.items = [
      {label: 'New', icon: 'pi pi-fw pi-plus'},
      {label: 'Open', icon: 'pi pi-fw pi-download'},
      {label: 'Undo', icon: 'pi pi-fw pi-refresh'}
    ];
  }

  toggleMenu() {
    this.toggled = !this.toggled;
  }
}
