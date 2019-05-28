import {NgModule} from '@angular/core';

import {LayoutComponent} from './layout/layout.component';
import {LogoutComponent} from './logout/logout.component';
import {HomeComponent} from "./home/home.component";
import {MenuComponent} from "./menu/menu.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    LayoutComponent,
    LogoutComponent,
    HomeComponent,
    MenuComponent],
  imports: [
    SharedModule
  ]
})
export class CoreModule {
}
