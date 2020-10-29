import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {NgxWebstorageModule} from "ngx-webstorage";
import {ConfirmationService} from "primeng/api";
import {MessagesModule} from "primeng/messages";
import {AuthExpiredInterceptor} from "./core/interceptors/auth-expired.interceptor";
import {NgxSpinnerModule} from "ngx-spinner";
import {CoreModule} from "./core/core.module";
import {AdminModule} from "./admin/admin.module";
import {SharedModule} from "./shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {createTranslateLoader} from "./app.translate.factory";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    NgxSpinnerModule,
    CoreModule,
    AdminModule,
    SharedModule,
    MessagesModule
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
