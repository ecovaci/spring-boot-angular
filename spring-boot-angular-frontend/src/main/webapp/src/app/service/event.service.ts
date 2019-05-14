import {Injectable} from '@angular/core';
import {BehaviorSubject, PartialObserver, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  subject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() {
  }

  subscribe (observer:PartialObserver<any>) {
    this.subject.subscribe(observer);
  }

  broadcast (event:any) {
    this.subject.next(event);
  }

}
