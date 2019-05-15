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
    this.items = [{
      label: 'File',
      items: [
        {label: 'New', icon: 'pi pi-fw pi-plus'},
        {label: 'Download', icon: 'pi pi-fw pi-download'}
      ]
    },
      {
        label: 'Edit',
        items: [
          {label: 'Add User', icon: 'pi pi-fw pi-user-plus'},
          {label: 'Remove User', icon: 'pi pi-fw pi-user-minus'}
        ]
      }];
  }

  toggleMenu() {
    this.toggled = !this.toggled;
  }
}
