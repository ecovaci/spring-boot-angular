import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HasAnyAuthorityDirective} from "./directives/has-any-authority.directive";
import {FormsModule} from "@angular/forms";
import {MenubarModule} from "primeng/menubar";
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {DialogModule} from "primeng/dialog";
import {ConfirmDialogModule} from "primeng/confirmdialog";

import {InputTextModule} from "primeng/inputtext";
import {MenuModule} from "primeng/menu";
import {MegaMenuModule} from "primeng/megamenu";
import {TableModule} from "primeng/table";
import {LoginComponent} from "./login/login.component";
import {TranslateModule} from "@ngx-translate/core";

import {OverlayPanelModule} from "primeng/overlaypanel";
import {PanelMenuModule} from "primeng/panelmenu";
import {PanelModule} from "primeng/panel";

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
    LoginComponent,
    TranslateModule
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
    TableModule,
    TranslateModule
  ]
})
export class SharedModule {
}
