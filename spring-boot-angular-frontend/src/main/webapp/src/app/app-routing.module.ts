import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from './user-list/user-list.component';
import {UserFormComponent} from './user-form/user-form.component';
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {AuthGaurdService} from "./service/auth-gaurd.service";

const routes: Routes = [
  {
    path: '',
    redirectTo: "/home",
    pathMatch: 'full',
    canActivate: [AuthGaurdService]
  },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGaurdService],
    children: [{path: 'users', component: UserListComponent, canActivate: [AuthGaurdService], outlet: 'boo'},
      {path: 'adduser', component: UserFormComponent, canActivate: [AuthGaurdService], outlet: 'boo'}]
  },
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes/*, {useHash: true}*/)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
