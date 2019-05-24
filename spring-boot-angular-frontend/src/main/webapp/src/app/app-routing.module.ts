import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./shared/login/login.component";
import {AuthGaurdService} from "./core/services/auth-gaurd.service";
import {LayoutComponent} from "./core/layout/layout.component";
import {HomeComponent} from "./core/home/home.component";

const routes: Routes = [

  {
    path: '',
    component: LayoutComponent,
    pathMatch: 'full',
    canActivate: [AuthGaurdService],
    children: [
      {path: '', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGaurdService]},
      {
        path: 'users', loadChildren: './admin/admin.module#AdminModule',
        canActivate: [AuthGaurdService]
      }
    ]
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
