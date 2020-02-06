import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PilarModule } from 'pilar';

// Route
import { ProfileRoutes } from './profile.routing';

// Module
import { ProfileComponent } from './profile.component';
import { TwoFactorAuthComponent} from './two-factor-auth/two-factor-auth.component';


@NgModule({
  imports: [
    CommonModule,
    PilarModule,
    ProfileRoutes
  ],
  declarations: [
    ProfileComponent,
    TwoFactorAuthComponent
  ],
  entryComponents: [
    TwoFactorAuthComponent
  ],
  providers: []
})
export class ProfileModule { }
