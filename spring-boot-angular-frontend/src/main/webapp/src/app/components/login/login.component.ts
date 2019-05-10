import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {User} from "../../model/user";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']/*,
  encapsulation: ViewEncapsulation.None*/
})
export class LoginComponent implements OnInit {
  user: User = new User();
  errorMessage: string;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  login() {
    this.authService.authenticate(this.user)
      .then((value) => {
        this.router.navigate(['home']);
      }).catch((reason) => {
      this.errorMessage = reason.error.message;
    });

  }
}
