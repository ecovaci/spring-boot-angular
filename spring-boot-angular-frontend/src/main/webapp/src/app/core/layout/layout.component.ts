import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";
import {AuthService} from "../services/auth.service";
import {LogoutComponent} from "../logout/logout.component";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent extends LogoutComponent {
  toggled: boolean;
  items: MenuItem[];

  ngOnInit() {
    this.items = [{
      label: 'Account',
      items: [
        {label: <string>this.authService.account.username,},
        {label: 'Logout', icon: 'fa fa-sign-out-alt', command: event1 => {this.logout()}},
        {label: 'Notifications', icon: 'fas fa-bell'}
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
