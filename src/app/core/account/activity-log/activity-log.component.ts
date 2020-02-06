import { Component, OnInit } from '@angular/core';
import { ActivityLogModel } from '@uiigateway/core';
import { AuthenticationService, ActivityLogService } from '@uiigateway/core';
import { ErrorService, TranslateService, LoadingBarService } from 'pilar';

@Component({
  selector: 'ugw-activity-log',
  templateUrl: './activity-log.component.html'
})
export class ActivityLogComponent implements OnInit {

  activityLogList: Array<ActivityLogModel>;
  columns: Array<any> = [];
  rows = new Array<any>();

  constructor(
    private activityLogSvc: ActivityLogService,
    private authenticationSvc: AuthenticationService,
    private errorSvc: ErrorService,
    private slimLoadingBarSvc: LoadingBarService,
    private translateSvc: TranslateService
  ) { }

  ngOnInit() {
    this.initGetLogList();
  }

  initGetLogList() {
    const params = {
      'id_member': this.authenticationSvc.getNik()
    };

    this.slimLoadingBarSvc.start();
    this.activityLogSvc.collection(params).subscribe(
      (response: any) => {
        this.slimLoadingBarSvc.complete();
        if (response.result === 'true') {
          const dataList = new Array<any>();
          this.activityLogList = response.data;
          this.activityLogList.forEach((value: any) => {
            dataList.push({
              'list': {
                'title': value.pesan,
                'note': value.tgl_log
              }
            });
          });

          this.rows = dataList;

          console.log(this.rows);
        } else {
          this.errorSvc.handleError(response);
        }
      });
  }

  initSetColumnDataTable() {
    // set column
    this.columns = [
      {
        name: this.translateSvc.instant('data'),
        prop: 'data',
        width: 130
      }
    ];
  }

}
