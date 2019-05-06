import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './user';
import {Observable} from 'rxjs';
import {ExternalLocation} from "../environments/environment";

@Injectable()
export class UserService {

  private readonly usersUrl: string;

  constructor(private http: HttpClient, location:ExternalLocation) {
    this.usersUrl = location.prepareExternalUrl("/users") ;
  }

  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  public save(user: User) {
    return this.http.post<User>(this.usersUrl, user);
  }
}
