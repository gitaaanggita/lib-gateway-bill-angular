
import {tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
  } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MenuService, StorageService, STORAGE_KEY } from '@uiigateway/core';
import { ErrorService, getValueOfIndexArrayString } from 'pilar';

@Injectable()
export class GlobalHttpInterceptor implements HttpInterceptor {

    constructor(
        private errorSvc: ErrorService,
        private menuSvc: MenuService,
        private router: Router,
        private storageSvc: StorageService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headers: any = {};

        try {
            const session = this.storageSvc.getLocalStorage(STORAGE_KEY.CURRENT_SESSION);
            if (session) {
                headers['Authorization'] = session.token;
            }

            const url = getValueOfIndexArrayString(this.router.url, '/', 1);
            const currentApp = this.storageSvc.getLocalStorage(STORAGE_KEY.CURRENT_OPENED_APP + '_' + url);
            const currentMenuId = this.menuSvc.getMenuIdByUrl(this.router.url);

            if (currentApp && currentApp.uuid_aplikasi) {
                headers['x-app'] = currentApp.uuid_aplikasi;
            }

            if (currentMenuId) {
                headers['x-menu'] = currentMenuId;
            }
        } catch (error) {
            // this.errorSvc.console(error);
        }

        request = request.clone({
          setHeaders: headers
        });

        return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              // do stuff with response if you want
            }
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    this.errorSvc.putError(err.status, err.error.message);
                } else if (err.status === 400) {
                    this.errorSvc.handleError(err.error);
                } else {
                    this.errorSvc.putError(err.status, err.message);
                }
            }
        }));
    }

}
