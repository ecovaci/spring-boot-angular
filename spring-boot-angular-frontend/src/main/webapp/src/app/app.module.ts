import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {UserService} from './core/services/user.service';
import {LoginComponent} from './core/login/login.component';
import {NgxWebstorageModule} from "ngx-webstorage";
import {MenubarModule} from "primeng/menubar";
import {ButtonModule} from "primeng/button";
import {
  CalendarModule,
  ConfirmationService,
  ConfirmDialogModule,
  DialogModule,
  InputTextModule,
  MegaMenuModule,
  MenuModule,
  OverlayPanelModule,
  PanelMenuModule,
  PanelModule
} from "primeng/primeng";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthExpiredInterceptor} from "./core/interceptors/auth-expired.interceptor";
import {NgxSpinnerModule} from "ngx-spinner";
import {TableModule} from "primeng/table";
import {MyUtils} from "./shared/utilities/utils";
import {CoreModule} from "./core/core.module";
import {SharedModule} from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxWebstorageModule.forRoot(),
    MenubarModule,
    ButtonModule,
    InputTextModule,
    ConfirmDialogModule,
    BrowserAnimationsModule,
    DialogModule,
    MegaMenuModule,
    PanelMenuModule,
    CalendarModule,
    NgxSpinnerModule,
    MenuModule,
    OverlayPanelModule,
    PanelModule,
    TableModule,
    CoreModule,
    SharedModule
  ],
  providers: [UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthExpiredInterceptor,
    multi: true
  }, ConfirmationService, MyUtils],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
