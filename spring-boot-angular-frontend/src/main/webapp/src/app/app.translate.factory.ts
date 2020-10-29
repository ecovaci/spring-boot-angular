import {HttpClient} from '@angular/common/http';
import {TranslateLoader} from "@ngx-translate/core";
import {forkJoin} from 'rxjs';
import {map} from 'rxjs/operators';

export function createTranslateLoader(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, undefined, undefined, ['users', 'common']);
}

export class MultiTranslateHttpLoader implements TranslateLoader {

  constructor(private http: HttpClient,
              private prefix: string = '/assets/i18n',
              private suffix: string = '.json',
              private resources: string [] = []) {
  }

  /**
   * Gets the translations from the server
   * @param lang
   * @returns {any}
   */
  public getTranslation(lang: string): any {
    return forkJoin(this.resources.map(config => {
      return this.http.get(`${this.prefix}/${lang}/${config}${this.suffix}`);
    })).pipe(map(response => {
      return response.reduce((a, b) => {
        return Object.assign(a, b);
      });
    }));
  }

}
