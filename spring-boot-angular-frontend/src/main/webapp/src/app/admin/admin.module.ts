import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {UserListComponent} from "./user-list/user-list.component";
import {UserFormComponent} from "./user-form/user-form.component";
import {UsersComponent} from './users/users.component';
import {TableModule} from "primeng/table";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {UserService} from "../core/services/user.service";
import {PUtilsService} from "../core/services/p-utils.service";

@NgModule({
  declarations: [
    UserListComponent,
    UserFormComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    TableModule,
    FormsModule,
    SharedModule
  ],
  providers: [
    UserService,
    PUtilsService
  ]
})
export class AdminModule {
}
