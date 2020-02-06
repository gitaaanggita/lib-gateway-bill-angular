import { Routes, RouterModule } from '@angular/router';
// import { UiiNotFoundPageComponent, UiiUnderConstructionPageComponent } from '@uiigateway/shared-lib/public_api';

const routes: Routes = [
  {
    path: 'account',
    redirectTo: 'account/profile'
  },
  {
    path: 'login',
    redirectTo: 'account/login'
  },
  // {
  //   path: 'not404found',
  //   component: UiiNotFoundPageComponent
  // },
  // {
  //   path: '**',
  //   component: UiiUnderConstructionPageComponent
  // },
];

export const AppRoutes = RouterModule.forRoot(routes);
