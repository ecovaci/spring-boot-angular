import {Component} from '@angular/core';
import {ConfirmationService, MenuItem} from "primeng/api";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {LogoutComponent} from "../logout/logout.component";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent extends LogoutComponent {
  items: MenuItem[];

  constructor(authService: AuthService, router: Router,
              confirmationService: ConfirmationService) {
    super(authService, router, confirmationService);
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Admin',
        icon: 'pi pi-pw pi-file',
        items: [{
          label: 'Users',
          icon: 'pi pi-fw pi-plus',
          items: [
            {label: 'List', icon: 'pi pi-fw pi-user-plus', routerLink: '/users/list'},
            {label: 'Filter', icon: 'pi pi-fw pi-filter'}
          ]
        }
        ]
      }

    ];
  }


  showDialog() {
    //this.eventService.broadcast('boo');
  }


}
