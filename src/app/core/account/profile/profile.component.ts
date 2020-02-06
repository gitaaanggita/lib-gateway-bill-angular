import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NOTIFICATION_TYPE, MODAL } from 'pilar';
import { AuthenticationService, StatusService, CoreService, StorageService, STORAGE_KEY } from '@uiigateway/core';
import { ConfirmdialogComponent } from 'pilar';
import { ValidateEqual, CustomValidators } from 'pilar';
import { ErrorService, DataService, TranslateService, LoadingBarService } from 'pilar';

import { TwoFactorAuthComponent } from './two-factor-auth/two-factor-auth.component';

@Component({
  selector: 'ugw-account-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  btnTwoFactorLabel: string;
  changePasswordForm: FormGroup;
  groups: any;
  modalRef: BsModalRef;
  onSubmitRequest = false;
  twoFactorAuthStatus = false;
  userInfo: any;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,

    private authenticationSvc: AuthenticationService,
    private dataSvc: DataService,
    private errorSvc: ErrorService,
    private modalSvc: BsModalService,
    private coreSvc: CoreService,
    private slimLoadingBarSvc: LoadingBarService,
    private statusSvc: StatusService,
    private storageSvc: StorageService,
    private translateSvc: TranslateService
  ) {
  }

  ngOnInit() {
    // unset current menu app
    this.storageSvc.removeLocalStorage(STORAGE_KEY.CURRENT_OPENED_APP);
    this.userInfo = this.authenticationSvc.userInfo;
    this.groups = this.authenticationSvc.userGroups;

    // Get Info user
    this.initSetTwoFactorStatus();
    // init form change Password
    this.initFormChangePassword();
  }

  doActivateTwoFA() {
    const body: any = {
      'uuid': this.userInfo.uuid,
      'reg': 1
    };

    // start loading bar
    this.slimLoadingBarSvc.start();
    this.authenticationSvc.registrasi2FA(body).subscribe(
      (response) => {

        // complete loading bar
        this.slimLoadingBarSvc.complete();
        if (response.result === 'true') {
          this.modalRef = this.modalSvc.show(TwoFactorAuthComponent, { class: MODAL.DETAIL.MEDIUM });
          this.modalRef.content.twoFA = response;
          this.modalRef.content.onClose.subscribe(result => {
            this.twoFactorAuthStatus = true;
            this.btnTwoFactorLabel = 'disabled';
          });
        } else {
          this.errorSvc.handleError(response);
        }
      },
      (err: HttpErrorResponse) => {
        // complete loading bar
        this.slimLoadingBarSvc.complete();
      }
    );
  }

  doDeactivateTwoFA() {
    const body: any = {
      'uuid': this.userInfo.uuid,
      'reg': 0
    };

    // start loading bar
    this.slimLoadingBarSvc.start();
    this.authenticationSvc.registrasi2FA(body).subscribe(
      (response) => {
        // complete loading bar
        this.slimLoadingBarSvc.complete();
        if (response.result === 'true') {
          if (typeof response.info === 'string') {
            this.coreSvc.growl(
              NOTIFICATION_TYPE.SUCCESS,
              response.info,
              () => {
                this.twoFactorAuthStatus = false;
                this.btnTwoFactorLabel = 'enable';
              },
              2000
            );
          }
        } else {
          this.errorSvc.handleError(response);
        }
      },
      (err: HttpErrorResponse) => {
        // complete loading bar
        this.slimLoadingBarSvc.complete();
      }
    );
  }

  doUpdatePassword(body: any) {
    this.slimLoadingBarSvc.start();
    this.onSubmitRequest = true;

    this.authenticationSvc.changePassword(body).subscribe(
      (response) => {
        this.slimLoadingBarSvc.complete();
        this.onSubmitRequest = false;

        if (response.result === 'true') {
          if (typeof response.info === 'string') {
            this.coreSvc.growl(
              NOTIFICATION_TYPE.SUCCESS,
              response.info,
              () => {
                this.location.back();
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

  initFormChangePassword() {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, CustomValidators.passwordQualified]],
      newPasswordConfirm: ['', [Validators.required, ValidateEqual('newPassword')]]
    });

    // detect form value change
    this.statusSvc.addEditMode = false;
    this.changePasswordForm.valueChanges.subscribe(data => {
      this.statusSvc.addEditMode = true;
    });
  }

  initSetTwoFactorStatus() {
    this.authenticationSvc.checkTwoFactorStatus().subscribe(response => {
      if (response.result === 'true') {
        const twoFactorIsActive = response.data && response.data.fa_is_active;

        if (twoFactorIsActive === 1 || twoFactorIsActive === '1') {
          this.twoFactorAuthStatus = true;
          this.btnTwoFactorLabel = 'disabled';
        } else {
          this.twoFactorAuthStatus = false;
          this.btnTwoFactorLabel = 'enable';
        }
      } else {
        this.errorSvc.handleError(response);
      }
    });
  }

  onBtnBackClick() {
    this.location.back();
  }

  onBtnTwoFactorClick() {
    if (this.twoFactorAuthStatus) {
      const modal = this.modalSvc.show(ConfirmdialogComponent, { class: MODAL.ALERT.WARNING });
        // title: 'Confirm title',
        (<ConfirmdialogComponent>modal.content).showConfirmationModal({
        message: this.translateSvc.instant('disable two factor authentication')
      });
      (<ConfirmdialogComponent>modal.content).onClose.subscribe(result => {
        // We get dialog result
        if (result === true) {
          this.doDeactivateTwoFA();
        } else {
          console.log('Close');
        }
      });
    } else {
      this.doActivateTwoFA();
    }
  }

  onImageError() {
    this.userInfo.photo = 'assets/images/profile.png';
  }

  onFormChangePasswordSubmit() {
    const formData = new FormData();

    formData.append('password_lama', this.changePasswordForm.value.oldPassword);
    formData.append('password_baru', this.changePasswordForm.value.newPassword);
    formData.append('password_konfirmasi', this.changePasswordForm.value.newPasswordConfirm);
    formData.append('id_member', this.authenticationSvc.getNim());

    this.doUpdatePassword(formData);
  }

}
