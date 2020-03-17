import {LazyLoadEvent} from "primeng/api";
import {HttpParams} from "@angular/common/http";
import * as _ from 'lodash';
import {Injectable} from "@angular/core";

/**
 * Utility functions.
 */
export namespace Utils {

  export function buildTableParams(event: LazyLoadEvent): HttpParams {
    let params: HttpParams = new HttpParams();
    // pagination
    params = params.set('page', String(event.first / event.rows)).set('size', String(event.rows));
    // sorting
    if (event.sortField) {
      params = params.set('sort', `${event.sortField},${event.sortOrder == 1 ? 'asc' : 'desc'}`);
    }
    // filtering
    _.map(event.filters, function (value, key) {
      params = params.set(`_f(${key},${value.matchMode})`, value.value);
    });
    return params;
  }


}

@Injectable()
export class MyUtils {
  filter(table, value, field, filterMatchMode): void {
    table.first = 0;
    table.filter(value, field, filterMatchMode);
  }
}


