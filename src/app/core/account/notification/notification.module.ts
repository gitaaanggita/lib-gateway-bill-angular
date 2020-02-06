import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PilarModule } from 'pilar';

// Route
import { NotificationRoutes } from './notification.routing';

// Module
import { NotificationComponent } from './notification.component';


@NgModule({
  imports: [
    CommonModule,
    PilarModule,
    NotificationRoutes
  ],
  declarations: [
    NotificationComponent
  ],
  providers: []
})
export class NotificationfModule { }
