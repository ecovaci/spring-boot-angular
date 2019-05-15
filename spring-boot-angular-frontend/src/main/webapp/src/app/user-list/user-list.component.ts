import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';
import {UserService} from '../service/user.service';
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[];
  _currentDate: Date = new Date();

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.userService.findAll().subscribe({
      next: data => {
        this.users = data;
      }
    });
  }

  private get currentDate(): Date {
    return this._currentDate;
  }
}
