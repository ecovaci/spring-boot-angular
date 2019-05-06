import {Injectable} from "@angular/core";
import {Location} from "@angular/common";

export const environment = {
  production: true
};

@Injectable({
  providedIn: 'root'
})
export class ExternalLocation {

  constructor(private location: Location) {
  }

  prepareExternalUrl(url: string): string {
    return this.location.prepareExternalUrl(url);
  }
}
