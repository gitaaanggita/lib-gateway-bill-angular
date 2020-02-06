import { LandingPageComponent } from '@uiigateway/core';
import { Routes, RouterModule } from '@angular/router';
import { BillComponent } from './bill.component';
import { CancelBillComponent } from './modules/cancel-bill/cancel-bill.component';
import { DispensationDateComponent } from './modules/dispensation-bill/dispensation-date/dispensation-date.component';
import { DispensationNominalComponent } from './modules/dispensation-bill/dispensation-nominal/dispensation-nominal.component';
import { GenerateBillComponent } from './modules/generate-bill/generate-bill.component';
import { MonitorBillComponent } from './modules/monitor-bill/monitor-bill.component';
import { ScheduleSettingSppFormComponent } from './modules/setting/setting-spp/schedule-setting-spp-form/schedule-setting-spp-form.component';
import { SettingCdComponent } from './modules/setting/setting-cd/setting-cd.component';
import { SettingCdFormComponent } from './modules/setting/setting-cd/setting-cd-form/setting-cd-form.component';
import { SettingSppComponent } from './modules/setting/setting-spp/setting-spp.component';
import { DispensationListComponent } from './modules/student/dispensation-list/dispensation-list.component';
import { StudentBillComponent } from './modules/student/student-bill/student-bill.component';
import { TableBillComponent } from './modules/student/table-bill/table-bill.component';

const routes: Routes = [
    {
        path: '',
        component: BillComponent,
        children: [
            {
                path: '',
                component: LandingPageComponent
            },
            {
                path: 'pengaturan',
                component: BillComponent,
                data: {
                    breadcrumb: 'Pengaturan'
                }
            },
            {
                path: 'tagihan_spp',
                component: BillComponent,
                data: {
                    breadcrumb: 'Tagihan SPP'
                },
                children: [
                    {
                        path: '',
                        component: SettingSppComponent
                    },
                    {
                        path: 'create',
                        component: ScheduleSettingSppFormComponent
                    }
                ]
            },
            {
                path: 'tagihan_cd',
                component: BillComponent,
                data: {
                    breadcrumb: 'Tagihan Caturdharma'
                },
                children: [
                    {
                        path: '',
                        component: SettingCdComponent
                    },
                    {
                        path: 'create',
                        component: SettingCdFormComponent
                    }
                ]
            },
            {
                path: 'dispensasi',
                component: BillComponent,
                data: {
                    breadcrumb: 'Pengaturan'
                }
            },
            {
                path: 'dispensasi_nominal',
                component: DispensationNominalComponent,
                data: {
                    breadcrumb: 'Dispensasi Nominal'
                }
            },
            {
                path: 'dispensasi_tanggal',
                component: DispensationDateComponent,
                data: {
                    breadcrumb: 'Dispensasi Tanggal Pembayaran'
                }
            },
            {
                path: 'batal_tagihan',
                component: CancelBillComponent,
                data: {
                    breadcrumb: "Pembatalan Tagihan"
                }
            },
            {
                path: 'generate',
                component: GenerateBillComponent,
                data: {
                    breadcrumb: 'Buat Tagihan'
                }
            },
            {
                path: 'monitor',
                component: MonitorBillComponent,
                data: {
                    breadcrumb: 'Monitoring Tagihan'
                }
            },
            {
                path: 'mahasiswa',
                component: BillComponent,
                data: {
                    breadcrumb: 'Mahasiswa'
                },
                children : [
                    {
                        path: '',
                        component: StudentBillComponent,
                    },
                    {
                        path: 'read',
                        component: TableBillComponent,
                        children: [
                            {
                                path: '',
                                component: DispensationListComponent
                            },
                            {
                                path: 'komponen',
                                component: DispensationListComponent
                            }
                        ]
                    },
                ]
            }
        ]
    }
];

export const BillRoutes = RouterModule.forChild(routes);