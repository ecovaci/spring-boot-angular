import {Component, OnInit} from '@angular/core';
import {EventService} from "./service/event.service";
import {EventType} from "./model/event";
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Spring Boot - Angular Application';
  displayLoginDialog: boolean;

  constructor(private eventService: EventService, private _router: Router, private spinner: NgxSpinnerService) {

  }

  ngOnInit(): void {

    // Subscribe to the router events observable
    this._router.events.subscribe((value) => {

      if (value instanceof NavigationStart) {
        this.spinner.show();
      }

      if (value instanceof NavigationEnd ||
        value instanceof NavigationError ||
        value instanceof NavigationCancel) {
        this.spinner.hide();
      }
    });

    this.eventService.subscribe({
      next: value => {
        this.displayLoginDialog = true;
      }
    }, EventType.OpenLoginDialog);

    this.eventService.subscribe({
      next: value => {
        this.displayLoginDialog = false;
      }
    }, EventType.CloseLoginDialog);
  }


}
