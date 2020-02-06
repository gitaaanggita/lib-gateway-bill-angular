import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PilarModule } from 'pilar';

import { ActivityLogComponent } from './activity-log.component';
import { ActivityLogRoutes } from './activity-log.routing';

@NgModule({
  imports: [
    CommonModule,
    PilarModule,
    ActivityLogRoutes
  ],
  declarations: [
    ActivityLogComponent
  ]
})
export class ActivityLogModule { }
