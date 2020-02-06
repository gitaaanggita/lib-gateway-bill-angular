import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { SharedLibModule } from '@uiigateway/shared-lib';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { BaseModule } from './core/base.module';
import { PilarModule, TranslatePipe } from 'pilar';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutes,
    PilarModule.forRoot(),
    BaseModule
  ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
