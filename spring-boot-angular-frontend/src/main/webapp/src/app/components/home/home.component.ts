import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MenuItem} from "primeng/api";
import {EventService} from "../../service/event.service";
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {AccountService} from "../../service/account.service";
import {AccountComponent} from "../account/account.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends AccountComponent {
  toggled: boolean;
  items: MenuItem[];
  username: String;

  constructor(public authService: AuthService, router: Router,
              confirmationService: ConfirmationService) {
    super(authService, router, confirmationService);
  }

  ngOnInit() {
    this.username = this.authService.account.username;
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
