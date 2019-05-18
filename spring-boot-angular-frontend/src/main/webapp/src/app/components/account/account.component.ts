import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {ConfirmationService} from "primeng/api";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router,
              private confirmationService: ConfirmationService) { }

  ngOnInit() {
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
}
