import {Component, OnInit} from '@angular/core';
import {EventService} from "./service/event.service";
import {EventType} from "./model/event";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Spring Boot - Angular Application';
  displayLoginDialog: boolean;

  constructor(private eventService: EventService) {

  }

  ngOnInit(): void {
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
