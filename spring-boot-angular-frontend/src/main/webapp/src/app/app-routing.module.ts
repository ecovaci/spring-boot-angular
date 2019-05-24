import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./core/login/login.component";
import {AuthGaurdService} from "./core/services/auth-gaurd.service";

const routes: Routes = [
  {
    path: '',
    redirectTo: "/home",
    pathMatch: 'full',
    canActivate: [AuthGaurdService]
  },
  {
    path: 'home',
    loadChildren: './core/core.module#CoreModule',
    canActivate: [AuthGaurdService]
  },

  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes/*, {useHash: true}*/)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
