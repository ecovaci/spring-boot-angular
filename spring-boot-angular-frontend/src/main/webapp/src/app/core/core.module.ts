import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LayoutComponent} from './layout/layout.component';
import {LogoutComponent} from './logout/logout.component';
import {ConfirmDialogModule, OverlayPanelModule, PanelMenuModule} from "primeng/primeng";
import {HomeComponent} from "./home/home.component";
import {NavbarComponent} from "./navbar/navbar.component";

@NgModule({
  declarations: [
    LayoutComponent,
    LogoutComponent,
    HomeComponent,
    NavbarComponent],
  imports: [
    CommonModule,
    OverlayPanelModule,
    PanelMenuModule,
    ConfirmDialogModule
  ]
})
export class CoreModule {
}
