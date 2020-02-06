import { NgModule, LOCALE_ID } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// Route
import { BaseRoutes } from './base.routing';

// Service
import {
  ActivityLogService,
  AuthenticationService,
  AuthGuard,
  CoreService,
  MenuService,
  NbMenuInternalService,
  NotificationService,
  StatusService,
  CoreModule
} from '@uiigateway/core';

const BaseService = [
  ActivityLogService,
  AuthenticationService,
  AuthGuard,
  CoreService,
  MenuService,
  NbMenuInternalService,
  NotificationService,
  StatusService
];

// Module
import { GlobalHttpInterceptor } from './providers';
import { BaseComponent } from './base.component';
import { PilarModule } from 'pilar';
import { LoginModule } from './account/login/login.module';
import { LoginSSOModule } from './account/login-sso/login-sso.module';
import { ResetPasswordModule } from './account/reset-password/reset-password.module';
import { KeyinAlertComponent } from './account/keyin-alert/keyin-alert.component';
import { environment } from 'src/environments/environment';
import { registerLocaleData } from '@angular/common';
import localeId from '@angular/common/locales/id';
registerLocaleData(localeId, 'id');

@NgModule({
  imports: [
    CoreModule.forRoot(environment),
    BaseRoutes,
    LoginModule,
    LoginSSOModule,
    ResetPasswordModule,
    PilarModule
  ],
  declarations: [
    BaseComponent,
    KeyinAlertComponent,
  ],
  entryComponents: [
    KeyinAlertComponent
  ],
  providers: [
    BaseService,
    { provide: LOCALE_ID, useValue: 'id-ID' },
    { provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptor, multi: true }
  ]
})
export class BaseModule { }
