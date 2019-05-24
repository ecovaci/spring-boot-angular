import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HasAnyAuthorityDirective} from "./directives/has-any-authority.directive";
import {FormsModule} from "@angular/forms";
import {MenubarModule} from "primeng/menubar";
import {ButtonModule} from "primeng/button";
import {
  CalendarModule,
  ConfirmDialogModule,
  DialogModule,
  InputTextModule,
  MegaMenuModule,
  MenuModule,
  OverlayPanelModule,
  PanelMenuModule,
  PanelModule
} from "primeng/primeng";
import {TableModule} from "primeng/table";
import {LoginComponent} from "./login/login.component";

@NgModule({
  declarations: [
    HasAnyAuthorityDirective,
    LoginComponent
  ],
  exports: [
    HasAnyAuthorityDirective,
    CommonModule,
    FormsModule,
    MenubarModule,
    ButtonModule,
    InputTextModule,
    ConfirmDialogModule,
    DialogModule,
    MegaMenuModule,
    PanelMenuModule,
    CalendarModule,
    MenuModule,
    OverlayPanelModule,
    PanelModule,
    TableModule,
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MenubarModule,
    ButtonModule,
    InputTextModule,
    ConfirmDialogModule,
    DialogModule,
    MegaMenuModule,
    PanelMenuModule,
    CalendarModule,
    MenuModule,
    OverlayPanelModule,
    PanelModule,
    TableModule
  ]
})
export class SharedModule {
}
