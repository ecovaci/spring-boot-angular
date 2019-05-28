import {Injectable} from '@angular/core';
import {PartialObserver, Subject} from "rxjs";
import {EventModel, EventType} from "../../shared/models/event";
import "rxjs-compat/add/operator/filter";
import {filter} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  subject: Subject<EventModel> = new Subject<EventModel>();

  constructor() {
  }

  subscribe(observer: PartialObserver<EventModel>, type: EventType) {
    if (type != null) {
      this.subject.pipe(filter((e) => e.eventType as EventType === type as EventType)).subscribe(observer);
    } else {
      this.subject.subscribe(observer);
    }

  }

  broadcast(event: EventModel) {
    this.subject.next(event);
  }

}
