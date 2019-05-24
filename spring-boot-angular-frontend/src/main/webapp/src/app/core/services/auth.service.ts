import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthServerProvider} from "./auth-provider.service";
import {Account} from "../../shared/models/account";
import {SessionStorageService} from 'ngx-webstorage';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly CURRENT_USER_KEY: string = '__currentUser__';

  constructor(private http: HttpClient, private authServerProvider: AuthServerProvider,
              private $sessionStorage: SessionStorageService) {
  }

  authenticate(credentials): Promise<Account> {
    return new Promise((resolve, reject) => {
      this.authServerProvider.login(credentials).subscribe(
        data => {
          let account: Account = new Account(data.username, _.chain(data.authorities).map(
            (authority) => authority.authority
          ).value());
          this.$sessionStorage.store(this.CURRENT_USER_KEY, account);
          resolve(account);
        },
        err => {
          this.logout();
          reject(err);
        }
      );
    });

  }

  isUserLoggedIn(): boolean {
    let result: boolean;
    if (this.account) {
      result = true;
    } else {
      result = false;
    }
    return result;
  }

  hasAnyAuthority(authorities: string[]): boolean {
    let account: Account = this.account;

    if (!account || !account.authorities) {
      return false;
    }

    return _.find(account.authorities, function (auth) {
      return authorities.includes(auth);
    }) !== undefined;
  }

  get account(): Account {
    return this.$sessionStorage.retrieve(this.CURRENT_USER_KEY);
  }

  logout() {
    this.authServerProvider.logout().subscribe();
    this.$sessionStorage.clear(this.CURRENT_USER_KEY);
  }
}
