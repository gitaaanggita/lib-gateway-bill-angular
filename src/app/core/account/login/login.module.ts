import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PilarModule } from 'pilar';

// Route
import { LoginRoutes } from './login.routing';

// Module
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    CommonModule,
    PilarModule,
    LoginRoutes
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
  ]
})
export class LoginModule { }
