import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthServerProvider {
  constructor(private http: HttpClient) {
  }

  login(credentials): Observable<any> {
    const data =
      `username=${encodeURIComponent(credentials.username)}` +
      `&password=${encodeURIComponent(credentials.password)}` +
      `&submit=Login`;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post('api/authentication', data, {headers});
  }

  logout(): Observable<any> {
    return this.http.post('api/logout', {}, {observe: 'response'}).pipe(
      map((response: HttpResponse<any>) => {
        // to get a new csrf token call the api ??????
        this.http.get('api/account').subscribe(() => {
        }, () => {
        });
        return response;
      })
    );
  }
}
