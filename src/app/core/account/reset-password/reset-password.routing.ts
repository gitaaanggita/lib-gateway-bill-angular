import { Routes, RouterModule } from '@angular/router';
import { ResetPasswordComponent } from './reset-password.component';
import { ResetPasswordConfirmComponent } from './reset-password-confirm/reset-password-confirm.component';
import { ResetPasswordInvalidComponent } from './reset-password-invalid/reset-password-invalid.component';
import { ResetPasswordExpiredComponent } from './reset-password-expired/reset-password-expired.component';
import { ResetPasswordSuccessComponent } from './reset-password-success/reset-password-success.component';

const routes: Routes = [
  {
    path: 'account/resetpassword',
    component: ResetPasswordComponent,
    children: [
      {
        path: ':uuid/:token',
        component: ResetPasswordComponent
      },
      {
        path: 'confirmation',
        component: ResetPasswordConfirmComponent
      },
      {
        path: 'expired',
        component: ResetPasswordExpiredComponent
      },
      {
        path: 'invalid',
        component: ResetPasswordInvalidComponent
      },
      {
        path: 'success',
        component: ResetPasswordSuccessComponent
      }
    ]
  },
];

export const ResetPasswordRoutes = RouterModule.forChild(routes);
