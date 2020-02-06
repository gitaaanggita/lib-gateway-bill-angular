import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';
import { CoreModule } from '@uiigateway/core';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as no_data from 'highcharts/modules/no-data-to-display.src';
import { PilarModule } from 'pilar';

import { BillComponent } from './bill.component';
import { Config, ENV } from './bill.config';
import { BillRoutes } from './bill.routing';
import { CancelBillComponent } from './modules/cancel-bill/cancel-bill.component';
import { DispensationDateComponent } from './modules/dispensation-bill/dispensation-date/dispensation-date.component';
import { DispensationNominalComponent } from './modules/dispensation-bill/dispensation-nominal/dispensation-nominal.component';
import { DispensationNominalEditComponent } from './modules/dispensation-bill/dispensation-nominal/dispensation-nominal-edit/dispensation-nominal-edit.component';
import { DispensationNominalViewComponent } from './modules/dispensation-bill/dispensation-nominal/dispensation-nominal-view/dispensation-nominal-view.component';
import { GenerateBillComponent } from './modules/generate-bill/generate-bill.component';
import { GenerateBillViewComponent } from './modules/generate-bill/generate-bill-view/generate-bill-view.component';
import { MonitorBillComponent } from './modules/monitor-bill/monitor-bill.component';
import { MonitorBillViewComponent } from './modules/monitor-bill/monitor-bill-view/monitor-bill-view.component';
import { SettingCdComponent } from './modules/setting/setting-cd/setting-cd.component';
import { SettingSppComponent } from './modules/setting/setting-spp/setting-spp.component';
import { SettingCdFormComponent } from './modules/setting/setting-cd/setting-cd-form/setting-cd-form.component';
import { SettingCdViewComponent } from './modules/setting/setting-cd/setting-cd-view/setting-cd-view.component';
import { ScheduleSettingSppFormComponent } from './modules/setting/setting-spp/schedule-setting-spp-form/schedule-setting-spp-form.component';
import { SettingSppComponentInputFormComponent } from './modules/setting/setting-spp/setting-spp-component-input-form/setting-spp-component-input-form.component';
import { DispensationListComponent } from './modules/student/dispensation-list/dispensation-list.component';
import { StudentBillComponent } from './modules/student/student-bill/student-bill.component';
import { TableBillComponent } from './modules/student/table-bill/table-bill.component';
import { ViewBillComponent } from './modules/student/view-bill/view-bill.component';
import { InfoBoxComponent } from './shared/info-box/info-box.component';
import { BillService } from './services/bill.service';

export function highchartsModules() {
  return [no_data];
}

@NgModule({
  declarations: [
    BillComponent,
    CancelBillComponent,    
    DispensationDateComponent,  
    DispensationListComponent,      
    DispensationNominalComponent,
    DispensationNominalEditComponent,
    DispensationNominalViewComponent,
    GenerateBillComponent,
    GenerateBillViewComponent,
    InfoBoxComponent,    
    MonitorBillComponent,    
    MonitorBillViewComponent,    
    ScheduleSettingSppFormComponent,    
    SettingCdComponent,  
    SettingCdFormComponent, 
    SettingCdViewComponent,         
    SettingSppComponent,
    SettingSppComponentInputFormComponent,    
    StudentBillComponent,
    TableBillComponent,    
    ViewBillComponent
  ],
  imports: [
    CommonModule,
    CoreModule,    
    ChartModule,
    PilarModule,
    BillRoutes
  ],
  entryComponents: [
    DispensationListComponent,    
    SettingSppComponentInputFormComponent,
    ViewBillComponent
  ],
  providers: [
    { provide: HIGHCHARTS_MODULES, useFactory: highchartsModules },
    BillService
  ]
})
export class BillModule { 
  static forRoot(config: Config): ModuleWithProviders {
    return {
      ngModule: BillModule,
      providers: [
        { provide: ENV, useValue: config }
      ]
    };
  }

  static forChild(config: Config): ModuleWithProviders {
    return {
      ngModule: BillModule,
      providers: [
        { provide: ENV, useValue: config }
      ]
    };
  }
}
