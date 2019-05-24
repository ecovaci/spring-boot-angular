import {Component, OnInit} from '@angular/core';
import {User} from '../../shared/models/user';
import {UserService} from '../../core/services/user.service';
import {LazyLoadEvent} from "primeng/api";
import {PUtilsService} from "../../core/services/p-utils.service";

import {MyUtils, Utils} from '../../shared/utilities/utils'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[];

  totalRecords: number;

  cols: any[];

  loading: boolean;

  constructor(private userService: UserService, public putils:MyUtils) {
    //event.first = First row offset
    //event.rows = Number of rows per page
    //event.sortField = Field name to sort with
    //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    //filters: FilterMetadata object having field as key and filter value, filter matchMode as value

  }

  ngOnInit() {
    this.cols = [
      {field: 'name', header: 'Name', filterMatchMode: 'contains'},
      {field: 'email', header: 'Email', filterMatchMode: 'contains'}
    ];
    this.loading = true;
  }

  loadCarsLazy(event: LazyLoadEvent) {
    console.log('loadCarsLazy', event);
    this.loading = true;
    this.userService.find(event).subscribe({
      next: data => {
        this.users = data.content;
        this.totalRecords = data.totalElements;
        this.loading = false;
      }
    });
  }

}
