import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { KeyinAlertComponent } from './../keyin-alert/keyin-alert.component';
import { TranslateService } from 'pilar';
import { AuthenticationService } from '@uiigateway/core';

@Component({
  selector: 'ugw-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  @Input() email: string;
  @Output() submitted = new EventEmitter();

  canLoginSSO = false;
  model: any = {};
  loading = false;
  error: any = {};
  enable2fa = false;
  forget = false;

  public loginForm: FormGroup;
  public labelButton = 'login button label';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private modalSvc: BsModalService,
    private authenticationSvc: AuthenticationService,
    private translateSvc: TranslateService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    // reset login status
    // setTimeout(() => {
    //   this.showConfirDialog();
    // });
    this.authenticationSvc.logout();
  }

  showConfirDialog() {
    const modalDialog = this.modalSvc.show(KeyinAlertComponent, {class : 'modal-lg modal-detail'});
  }

  onBtnBackClick() {
    this.forget = false;
    this.error = null;
    // this.router.navigate([this.authenticationSvc.redirectUrl]);
  }

  onBtnForgotPassworClick() {
    this.forget = true;
  }

  onFormLoginSubmit({ username, password }) {
    this.error = {};
    this.loading = true;

    this.authenticationSvc.login(
      username,
      password,
      (result: boolean, error: any) => {
        if (result === true) {
          this.loading = false;

          // check if two factor authentication is enable
          this.enable2fa = this.authenticationSvc.enable2Fa;
          if (!this.enable2fa) {
            this.router.navigate([this.authenticationSvc.redirectUrl]);
          }
        } else {
          this.loading = false;
          if (error && error.code) {
            this.error.message = this.translateSvc.instant(error.code.toString());
            this.error.code = error.code;
          } else {
            this.error.message = this.translateSvc.instant('000');
            this.error.code = 107;
          }
        }
      }
    );
  }

  onFormResetPasswordSubmit() {
    const body: any = {
      'id': this.model.nameemail
    };

    this.loading = true;
    this.authenticationSvc.resetPassword(body, (result: boolean, error: any) => {
      console.log(result);
      this.loading = false;
      if (result === true) {
        this.router.navigate(['account/resetpassword/confirmation']);
      } else {
        this.loading = false;
        if (error && error.code) {
          this.error = error;
        } else {
          this.error.message = 'Username/email not registered';
          this.error.code = 109;
          setTimeout(() => {
            this.error = {};
          }, 2000);
        }
      }
    });
  }

  onFormVerifyTwoFactorAuthSubmit() {
    const body: any = {
      'uuid': this.authenticationSvc.userInfo.uuid,
      'fa_code': this.model.code
    };

    this.loading = true;
    this.authenticationSvc.verify2FA(body, (result: boolean, error: any) => {
      this.loading = false;
      if (result === true) {
        this.router.navigate([this.authenticationSvc.redirectUrl]);
      } else {
        this.loading = false;
        if (error && error.code) {
          this.error = error;
        } else {
          this.error.message = 'Kode authenticator is incorrect';
          this.error.code = 108;
          setTimeout(() => {
            this.error = {};
          }, 2000);
        }
      }
    });
  }

  onClickSSO() {
    const urlHost = window.location.host;
    if (urlHost === '192.168.203.206' || urlHost === 'localhost:4200') {
      window.location.replace('https://sso-dev.micro.uii.id/index.php/sso/login');
    } else if (urlHost === '192.168.203.199') {
      window.location.replace('https://sso-stag.micro.uii.id/index.php/sso/login');
    } else if (urlHost === 'gateway.uii.ac.id') {
      window.location.replace('https://sso.uii.ac.id/index.php/sso/login');
    }
  }
}
