import { Routes, RouterModule } from '@angular/router';
import { LoginSSOComponent } from './login-sso.component';

const routes: Routes = [
  {
    path: 'loginsso',
    component: LoginSSOComponent,
    children: [
        {
            path: ':id_member/:session',
            component: LoginSSOComponent
        }
    ]
  },
];

export const LoginSSORoutes = RouterModule.forChild(routes);
