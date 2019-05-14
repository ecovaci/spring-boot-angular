import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthServerProvider } from '../service/auth-provider.service';
import { EventService } from '../service/event.service';
import {EventModel} from "../model/event";

@Injectable()
export class AuthExpiredInterceptor implements HttpInterceptor {
    constructor(
        private eventService: EventService,
        private authServerProvider: AuthServerProvider
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap(
                (event: HttpEvent<any>) => {},
                (err: any) => {
                    if (err instanceof HttpErrorResponse) {
                        if (err.status === 403 && err.url && !err.url.includes('/api/account')) {
                            this.authServerProvider.logout();
                            this.eventService.broadcast(new EventModel('login'));
                        }
                    }
                }
            )
        );
    }
}
