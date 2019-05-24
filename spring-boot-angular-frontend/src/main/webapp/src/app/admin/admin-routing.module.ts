import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "../core/home/home.component";
import {AuthGaurdService} from "../core/services/auth-gaurd.service";
import {UserListComponent} from "./user-list/user-list.component";
import {UserFormComponent} from "./user-form/user-form.component";
import {UsersComponent} from "./users/users.component";

const routes: Routes = [
  {
    path: '', component: UsersComponent, canActivate: [AuthGaurdService],
    children: [{path: 'list', component: UserListComponent, canActivate: [AuthGaurdService]},
      {path: 'add', component: UserFormComponent, canActivate: [AuthGaurdService]}]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
