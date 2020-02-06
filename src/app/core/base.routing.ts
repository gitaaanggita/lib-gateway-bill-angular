import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './base.component';
import { AuthGuard } from '@uiigateway/core';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'account/profile',
        loadChildren: () => import('./account/profile/profile.module').then(m => m.ProfileModule),
        data: {
          breadcrumb: 'Profile User'
        }
      },
      {
        path: 'account/log',
        loadChildren: () => import('./account/activity-log/activity-log.module').then(m => m.ActivityLogModule),
        data: {
          breadcrumb: 'Log Aktifitas'
        }
      },
      {
        path: 'account/notification',
        loadChildren: () => import('./account/notification/notification.module').then(m => m.NotificationfModule),
        data: {
          breadcrumb: 'Notifikasi'
        }
      },
      {
        path: 'tagihan',
        loadChildren: () => import('./modules/bill-lazyload.module').then(m => m.BillLazyloadModule),
        data: {
          breadcrumb: 'Tagihan'
        }
      }
      // {
      //   path: 'pengaturan',
      //   loadChildren: './modules/settings-lazyload.module#SettingsLazyloadModule',
      //   data: {
      //     breadcrumb: 'Pengaturan'
      //   }
      // },
      // {
      //   path: 'skp',
      //   loadChildren: './applications/skp/skp.module#SkpModule',
      //   data: {
      //     breadcrumb: 'SKP'
      //   }
      // },
      // {
      //   path: 'skpi',
      //   loadChildren: './applications/skpi/skpi.module#SkpiModule',
      //   data: {
      //     breadcrumb: 'SKPI'
      //   }
      // },
      // {
      //   path: 'monitor',
      //   loadChildren: './applications/monitor/monitor.module#MonitorModule',
      //   data: {
      //     breadcrumb: 'Monitor'
      //   }
      // },
      // {
      //   path: 'log',
      //   loadChildren: './applications/log/log.module#LogModule',
      //   data: {
      //     breadcrumb: 'Log'
      //   }
      // },
      // {
      //   path: 'references',
      //   loadChildren: './applications/references/references.module#ReferencesModule',
      //   data: {
      //     breadcrumb: 'Rujukan'
      //   }
      // },
      // {
      //   path: 'personal',
      //   loadChildren: './applications/personal/personal.module#PersonalModule',
      //   data: {
      //     breadcrumb: 'Personal'
      //   }
      // },
      //  {
      //   path: 'dasbor',
      //   loadChildren: './applications/dashboard/dashboard.module#DashboardModule',
      //   data: {
      //     breadcrumb: 'Dasbor'
      //   }
      // },
      // {
      //   path: 'kurikulum',
      //   loadChildren: './applications/curriculum/curriculum.module#CurriculumModule',
      //   data: {
      //     breadcrumb: 'Kurikulum'
      //   }
      // },
      // {
      //   path: 'jadwal',
      //   loadChildren: './applications/schedule/schedule.module#ScheduleModule',
      //   data: {
      //     breadcrumb: 'Jadwal'
      //   }
      // },
      // {
      //   path: 'ras',
      //   loadChildren: './applications/ras/ras.module#RasModule',
      //   data: {
      //     breadcrumb: 'RAS'
      //   }
      // }
      // {
      //   path: 'ui-template',
      //   loadChildren: './applications/ui-templates/ui-templates.module#UiTemplatesModule',
      //   data: {
      //     breadcrumb: 'UI Framework'
      //   }
      // },
    ]
  },
];

export const BaseRoutes = RouterModule.forChild(routes);
