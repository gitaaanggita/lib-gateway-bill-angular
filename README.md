This project was generated with [Angular CLI](https://github.com/angular/angular-cli)

## Links
- [Release Notes](https://gitlab-cloud.uii.ac.id/finance/frontend/lib-uii-gateway-bill-angular/blob/master/CHANGELOG.md)

## Installation

```bash
npm install @uiigateway/bill --registry https://npm.uii.ac.id
```

## How to Use

Register into your NgModule

```ts
import { BillModule } from '@uiigateway/bill';
import { environment } from 'src/environments/environment';

@NgModule({
  imports: [
    billModule.forChild(environment)
  ]
})
export class BillPackageModule { }
```

Load `BillPackageModule` with lazy load from your routing.

```ts
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'tagihan',
        loadChildren: './applications/bill-package/bill-package.module#BillPackageModule',
      }
    ]
  },
];

export const BaseRoutes = RouterModule.forChild(routes);
```
