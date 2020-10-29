import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./shared/login/login.component";
import {AuthGuardService} from "./core/services/auth-guard.service";
import {LayoutComponent} from "./core/layout/layout.component";
import {HomeComponent} from "./core/home/home.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full',
        canActivate: [AuthGuardService]
      },
      {
        path: 'users',
        loadChildren: './admin/admin.module#AdminModule',
        canActivate: [AuthGuardService]
      }
    ]
  },

  {path: 'home', redirectTo: ''},

  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes/*, {useHash: true}*/)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
