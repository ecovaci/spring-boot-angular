import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {ConfirmationService} from "primeng/api";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  username: String;

  constructor(public authService: AuthService, private router: Router,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    this.username = this.authService.account.username;
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
