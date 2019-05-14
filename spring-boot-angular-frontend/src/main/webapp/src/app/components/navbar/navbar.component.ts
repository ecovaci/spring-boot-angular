import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MenuItem} from "primeng/api";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {EventService} from "../../service/event.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [ConfirmationService]
})
export class NavbarComponent implements OnInit {
  items: MenuItem[];

  constructor(private authService: AuthService, private router: Router,
              private confirmationService: ConfirmationService,
              private eventService: EventService) {
  }

  ngOnInit() {
    this.items = [
      {
        label: 'File',
        items: [{
          label: 'New',
          icon: 'pi pi-fw pi-plus',
          items: [
            {label: 'Project'},
            {label: 'Other'},
          ]
        },
          {label: 'Open'},
          {label: 'Quit'}
        ]
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        items: [
          {label: 'Delete', icon: 'pi pi-fw pi-trash'},
          {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
        ]
      }
    ];
  }

  logout() {
    console.log('logout');
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.authService.logout();
        this.router.navigate(['login']);
      }
    });

  }

  showDialog() {
    this.eventService.broadcast('boo');
  }
}
