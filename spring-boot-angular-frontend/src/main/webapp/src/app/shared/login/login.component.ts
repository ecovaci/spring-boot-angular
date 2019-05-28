import {Component, OnInit} from '@angular/core';
import {User} from "../models/user";
import {AuthService} from "../../core/services/auth.service";
import {Router} from "@angular/router";
import {EventService} from "../../core/services/event.service";
import {EventModel, EventType} from "../models/event";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']/*,
  encapsulation: ViewEncapsulation.None*/
})
export class LoginComponent implements OnInit {
  user: User = new User();
  errorMessage: string;

  constructor(private authService: AuthService, private router: Router, private eventService:EventService) {
  }

  ngOnInit() {
  }

  login() {
    this.authService.authenticate(this.user)
      .then((value) => {
        this.eventService.broadcast(new EventModel(EventType.LoginSuccess));
        this.router.navigate(['home']);
      }).catch((reason) => {
      if (typeof reason.error == "string") {
        this.errorMessage = reason.message;
      } else {
        this.errorMessage = reason.error.message;
      }
    });

  }
}
