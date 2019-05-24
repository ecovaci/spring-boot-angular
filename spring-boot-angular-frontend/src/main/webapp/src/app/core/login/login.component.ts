import {Component, OnInit} from '@angular/core';
import {User} from "../../shared/models/user";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {EventService} from "../services/event.service";
import {EventModel, EventType} from "../../shared/models/event";

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
        this.eventService.broadcast(new EventModel(EventType.CloseLoginDialog));
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
