import { Routes, RouterModule } from '@angular/router';
import { ActivityLogComponent } from './activity-log.component';

const routes: Routes = [
  {
    path: '',
    component: ActivityLogComponent
  },
];

export const ActivityLogRoutes = RouterModule.forChild(routes);
