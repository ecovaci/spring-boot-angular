import {AuthGaurdService} from "./service/auth-gaurd.service";
import {UserListComponent} from "./user-list/user-list.component";
import {UserFormComponent} from "./user-form/user-form.component";
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";

export const DETAILS_ROUTES = [
  { path: 'users', component: UserListComponent ,canActivate:[AuthGaurdService]},
  { path: 'adduser', component: UserFormComponent ,canActivate:[AuthGaurdService]},
  { path: 'home', component: HomeComponent ,canActivate:[AuthGaurdService]},
  { path: 'login', component: LoginComponent }
];
