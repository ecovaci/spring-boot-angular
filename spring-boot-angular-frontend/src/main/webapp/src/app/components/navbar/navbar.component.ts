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
        icon: 'pi pi-pw pi-file',
        items: [{
          label: 'New',
          icon: 'pi pi-fw pi-plus',
          items: [
            {label: 'User', icon: 'pi pi-fw pi-user-plus'},
            {label: 'Filter', icon: 'pi pi-fw pi-filter'}
          ]
        },
          {label: 'Open', icon: 'pi pi-fw pi-external-link'},
          {separator: true},
          {label: 'Quit', icon: 'pi pi-fw pi-times'}
        ]
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        items: [
          {label: 'Delete', icon: 'pi pi-fw pi-trash'},
          {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
        ]
      },
      {
        label: 'Help',
        icon: 'pi pi-fw pi-question',
        items: [
          {
            label: 'Contents',
            icon: 'pi pi-pi pi-bars'
          },
          {
            label: 'Search',
            icon: 'pi pi-pi pi-search',
            items: [
              {
                label: 'Text',
                items: [
                  {
                    label: 'Workspace'
                  }
                ]
              },
              {
                label: 'User',
                icon: 'pi pi-fw pi-file',
              }
            ]}
        ]
      },
      {
        label: 'Actions',
        icon: 'pi pi-fw pi-cog',
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
              {label: 'Save', icon: 'pi pi-fw pi-save'},
              {label: 'Update', icon: 'pi pi-fw pi-save'},
            ]
          },
          {
            label: 'Other',
            icon: 'pi pi-fw pi-tags',
            items: [
              {label: 'Delete', icon: 'pi pi-fw pi-minus'}
            ]
          }
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
    //this.eventService.broadcast('boo');
  }
}
