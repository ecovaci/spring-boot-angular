import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PUtilsService {

  constructor() {
  }

  filter(table, value, field, filterMatchMode): void {
    table.first = 0;
    table.filter(value, field, filterMatchMode);
  }

}
