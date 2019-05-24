import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {PageModel, User} from '../../shared/models/user';
import {Observable} from 'rxjs';
import {LazyLoadEvent} from "primeng/api";
import {Utils} from "../../shared/utilities/utils";

@Injectable()
export class UserService {

  private readonly usersUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'api/users/list';
  }

  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  public find(event: LazyLoadEvent): Observable<PageModel> {
    return this.http.get<PageModel>(this.usersUrl, {params: Utils.buildTableParams(event)});
  }


  public save(user: User) {
    return this.http.post<User>(this.usersUrl, user);
  }
}
