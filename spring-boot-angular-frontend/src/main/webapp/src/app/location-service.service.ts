import {Injectable} from '@angular/core';
import {Location} from "@angular/common";
import { isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationServiceService {

  constructor(private location: Location) {
  }

  prepareExternalUrl(url: string): string {
    if (isDevMode()) {
       return `http://localhost:8080/spring-boot-angular${url}`
    }
    return this.location.prepareExternalUrl(url);
  }
}
