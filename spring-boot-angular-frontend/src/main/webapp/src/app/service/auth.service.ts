import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthServerProvider} from "./auth-provider.service";
import {Account} from "../model/account";
import {SessionStorageService} from 'ngx-webstorage';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private router: Router;

  constructor(private http: HttpClient, private authServerProvider: AuthServerProvider, private $sessionStorage: SessionStorageService) {
  }

  account: Account = null;

  authenticate(credentials): Promise<Account> {
    return new Promise((resolve, reject) => {
      this.authServerProvider.login(credentials).subscribe(
        data => {
          this.account = new Account(data.username, _.chain(data.authorities).map(
            (authority) => authority.authority
          ).value());
          this.$sessionStorage.store('currentUser', this.account);
          resolve(this.account);
        },
        err => {
          console.log("=====", err)
          this.logout();
          reject(err);
        }
      );
    });

  }

  isUserLoggedIn(): boolean {
    let result: boolean;
    if (this.$sessionStorage.retrieve('currentUser')) {
      result = true;
    } else {
      result = false;
    }
    console.log("result", result)
    return result;
  }

  logout() {

  }
}
