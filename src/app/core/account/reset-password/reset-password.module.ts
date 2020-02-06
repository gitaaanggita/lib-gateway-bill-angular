import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PilarModule } from 'pilar';

import { ResetPasswordRoutes } from './reset-password.routing';
import { ResetPasswordComponent } from './reset-password.component';
import { ResetPasswordConfirmComponent } from './reset-password-confirm/reset-password-confirm.component';
import { ResetPasswordInvalidComponent } from './reset-password-invalid/reset-password-invalid.component';
import { ResetPasswordExpiredComponent } from './reset-password-expired/reset-password-expired.component';
import { ResetPasswordSuccessComponent } from './reset-password-success/reset-password-success.component';


@NgModule({
  imports: [
    CommonModule,
    PilarModule,
    ResetPasswordRoutes
  ],
  declarations: [
    ResetPasswordComponent,
    ResetPasswordConfirmComponent,
    ResetPasswordInvalidComponent,
    ResetPasswordExpiredComponent,
    ResetPasswordSuccessComponent
]
})
export class ResetPasswordModule { }
