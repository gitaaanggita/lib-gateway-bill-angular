import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@uiigateway/core';


@Component({
  selector: 'ugw-login-sso',
  templateUrl: './login-sso.component.html'
})
export class LoginSSOComponent implements OnInit {
  url;
  error: any = {};
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.url = window.location;
    console.log(this.url);
    this.ssoResponse();
  }

  ssoResponse() {
    /*Mengambil URL setelah lupapassword untuk uuid*/
    const id_member = this.url.pathname.split('/')[2];
    /*Mengambil URL setelah lupapassword untuk token*/
    const session_idp = this.url.pathname.split('/')[3];
    /*Panggil services confrimasi Forget Password dengan parameter uuid dan token*/
    this.authenticationService.loginSSO(id_member, session_idp, (result: boolean, error: any) => {
      if (result === true) {
          this.router.navigate([this.authenticationService.redirectUrl]);
      } else {
        this.router.navigate([this.authenticationService.redirectUrl + 'login']);
      }
  });
  }

}
