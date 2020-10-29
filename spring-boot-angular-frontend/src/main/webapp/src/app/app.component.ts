import {Component, OnInit} from '@angular/core';
import {EventService} from "./core/services/event.service";
import {EventType} from "./shared/models/event";
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {TranslateService} from "@ngx-translate/core";
import {Message, MessageService} from "primeng/api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]
})
export class AppComponent implements OnInit {

  title = 'Spring Boot - Angular Application';
  displayLoginDialog: boolean;
  msgs: Message[] = [];

  constructor(private eventService: EventService, private _router: Router,
              private spinner: NgxSpinnerService, private translate: TranslateService,
              private messageService: MessageService) {
    // this language will be used as a fallback
    // when a translation isn't found in the current language
    translate.setDefaultLang('ro');

    // the lang to use, if the lang isn't available,
    // it will use the current loader to get them
    translate.use('ro');
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
        console.log('Received AccessDenied message', value);
        this.msgs = [];
        this.msgs.push({severity:'error', summary:'Error Message', detail:'Access denied!'});
      }
    }, EventType.AccessDenied);

    this.eventService.subscribe({
      next: value => {
        console.log('Received LoginSuccess message', value);
        this.displayLoginDialog = false;
      }
    }, EventType.LoginSuccess);

    this.eventService.subscribe({
      next: value => {
        console.log('Received LoginRequired message', value);
        this.displayLoginDialog = true;
      }
    }, EventType.LoginRequired);

  }

}
