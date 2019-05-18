import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {UserListComponent} from './user-list/user-list.component';
import {UserFormComponent} from './user-form/user-form.component';
import {UserService} from './service/user.service';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {NgxWebstorageModule} from "ngx-webstorage";
import {NavbarComponent} from './components/navbar/navbar.component';
import {MenubarModule} from "primeng/menubar";
import {ButtonModule} from "primeng/button";
import {
  CalendarModule,
  ConfirmationService,
  ConfirmDialogModule,
  DialogModule,
  InputTextModule,
  MegaMenuModule,
  MenuModule, OverlayPanelModule,
  PanelMenuModule, PanelModule
} from "primeng/primeng";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HasAnyAuthorityDirective} from "./directive/has-any-authority.directive";
import {AuthExpiredInterceptor} from "./interceptor/auth-expired.interceptor";
import {NgxSpinnerModule} from "ngx-spinner";
import { AccountComponent } from './components/account/account.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserFormComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    HasAnyAuthorityDirective,
    AccountComponent
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
    PanelModule
  ],
  providers: [UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthExpiredInterceptor,
    multi: true
  }, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
