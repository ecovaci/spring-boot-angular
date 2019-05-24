import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGaurdService} from "./services/auth-gaurd.service";
import {HomeComponent} from "./home/home.component";
import {LayoutComponent} from "./layout/layout.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', component: HomeComponent},
      {path: 'users', loadChildren: '../admin/admin.module#AdminModule',
        canActivate: [AuthGaurdService]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
