import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PilarModule } from 'pilar';
import { LoginSSORoutes } from './login-sso.routing';
import { LoginSSOComponent } from './login-sso.component';

@NgModule({
  imports: [
    CommonModule,
    PilarModule,
    LoginSSORoutes
  ],
  declarations: [
    LoginSSOComponent
]
})
export class LoginSSOModule { }
