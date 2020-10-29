import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "../core/home/home.component";
import {AuthGuardService} from "../core/services/auth-guard.service";
import {UserListComponent} from "./user-list/user-list.component";
import {UserFormComponent} from "./user-form/user-form.component";
import {UsersComponent} from "./users/users.component";

const routes: Routes = [
  {
    path: '', component: UsersComponent, canActivate: [AuthGuardService],
    children: [{path: 'list', component: UserListComponent, canActivate: [AuthGuardService]},
      {path: 'add', component: UserFormComponent, canActivate: [AuthGuardService]}]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
