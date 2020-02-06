import { Component, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { AuthenticationService, CoreService } from '@uiigateway/core';
import { ErrorService, LoadingBarService } from 'pilar';
import { NOTIFICATION_TYPE } from 'pilar';

@Component({
  selector: 'ugw-two-factor-auth',
  templateUrl: './two-factor-auth.component.html'
})
export class TwoFactorAuthComponent {
  public twoFA: any;
  public authenticatorForm: FormGroup;
  public userInfo;
  public onSubmitRequest = false;
  public onClose: Subject<string>;

  constructor(
    private authenticationSvc: AuthenticationService,
    private formBuilder: FormBuilder,
    private slimLoadingBarSvc: LoadingBarService,
    private errorSvc: ErrorService,
    private coreSvc: CoreService,

    public activeModal: BsModalRef
  ) {
    this.userInfo = this.authenticationSvc.userInfo;
    // build form
    this.initFormKeyAuthenticator();
    this.onClose = new Subject();
  }

  // event ketika simpan
  onFormKeyAuthenticatorSubmit() {
    const formData = new FormData();

    formData.append('uuid', this.userInfo.uuid);
    formData.append('fa_code', this.authenticatorForm.value.key);

    this.doSubmitKeyAuthenticator(formData);
  }

  // initial form
  initFormKeyAuthenticator() {
    this.authenticatorForm = this.formBuilder.group({
      key: ['', Validators.required]
    });
  }

  // mengirim status aktif 2FA
  doSubmitKeyAuthenticator(body: any) {
    this.slimLoadingBarSvc.start();
    this.onSubmitRequest = true;

    this.authenticationSvc.submit2FA(body).subscribe(
      (response) => {
        this.slimLoadingBarSvc.complete();
        this.onSubmitRequest = false;

        if (response.result === 'true') {
          if (typeof response.info === 'string') {
            this.coreSvc.growl(
              NOTIFICATION_TYPE.SUCCESS,
              response.info,
              () => {
                this.activeModal.hide();
                this.onClose.next('true');
              },
              2000
            );
          }
        } else {
          this.errorSvc.handleError(response);
        }
      },
      (err: HttpErrorResponse) => {
        this.slimLoadingBarSvc.complete();
        this.onSubmitRequest = false;
      }
    );
  }
}
