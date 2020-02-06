import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationModel } from '@uiigateway/core';
import { ErrorService, LoadingBarService } from 'pilar';
import { AuthenticationService, NotificationService } from '@uiigateway/core';

@Component({
  selector: 'ugw-notification',
  templateUrl: './notification.component.html'
})
export class NotificationComponent implements OnInit {

  notifList: NotificationModel[] = [];
  notifTrue = false;
  userLogin;
  keyword: string;

  constructor(
    private authenticationSvc: AuthenticationService,
    private errorSvc: ErrorService,
    private notificationSvc: NotificationService,
    private slimLoadingBarSvc: LoadingBarService
  ) { }

  ngOnInit() {
    this.userLogin = this.authenticationSvc.userInfo;

    // get notif collection list
    this.slimLoadingBarSvc.start();
    this.notificationSvc.collection().subscribe(
      (response: any) => {
        this.slimLoadingBarSvc.complete();
        if (response.result === 'true') {
          this.notifList = response.data;
        } else {
          this.errorSvc.handleError(response);
        }
      }, (err: HttpErrorResponse) => {
        this.slimLoadingBarSvc.complete();
      }
    );

    this.notifTrue = false;
  }

  read(notif) {
    const formData = new FormData();
    const read = 1;

    formData.append('id', notif.id);
    formData.append('user_update', this.authenticationSvc.getNik());
    formData.append('flag_read', read.toString());

    this.update(formData);
  }

  update(body: any) {
    this.notificationSvc.update(body).subscribe(
      (response) => {
       console.log(response);
      },
    );
  }

}
