import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {UserService} from './core/services/user.service';
import {NgxWebstorageModule} from "ngx-webstorage";
import {ConfirmationService} from "primeng/primeng";
import {AuthExpiredInterceptor} from "./core/interceptors/auth-expired.interceptor";
import {NgxSpinnerModule} from "ngx-spinner";
import {CoreModule} from "./core/core.module";
import {SharedModule} from "./shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    NgxSpinnerModule,
    CoreModule,
    SharedModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthExpiredInterceptor,
    multi: true
  }, ConfirmationService],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
