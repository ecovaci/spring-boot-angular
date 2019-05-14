import {Injectable} from '@angular/core';
import {PartialObserver, Subject} from "rxjs";
import {EventModel, EventType} from "../model/event";
import "rxjs-compat/add/operator/filter";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  subject: Subject<EventModel> = new Subject<EventModel>();

  constructor() {
  }

  subscribe(observer: PartialObserver<EventModel>, type?: EventType) {
    if (type) {
      this.subject.filter((e) => e.eventType === type).subscribe(observer);
    } else {
      this.subject.subscribe(observer);
    }

  }

  broadcast(event: EventModel) {
    this.subject.next(event);
  }

}
