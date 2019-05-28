import {NgModule} from '@angular/core';

import {LayoutComponent} from './layout/layout.component';
import {LogoutComponent} from './logout/logout.component';
import {HomeComponent} from "./home/home.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    LayoutComponent,
    LogoutComponent,
    HomeComponent,
    NavbarComponent],
  imports: [
    SharedModule
  ]
})
export class CoreModule {
}
