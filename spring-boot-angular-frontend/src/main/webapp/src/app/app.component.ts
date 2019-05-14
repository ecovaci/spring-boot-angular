import {Component, OnInit} from '@angular/core';
import {EventService} from "./service/event.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Spring Boot - Angular Application';
  display: boolean;

  constructor(private eventService: EventService) {

  }

  ngOnInit(): void {
    this.eventService.subscribe({
      next: value => {
        if (value) {
          console.log(value);
          this.display = true;
        }
      }
    })
  }


}
