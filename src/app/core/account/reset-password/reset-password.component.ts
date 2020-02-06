import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@uiigateway/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ugw-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authenticationSvc: AuthenticationService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const uuid = params['uuid'];
      const token = params['token'];
      if (uuid && token) {
        this.authenticationSvc.confirmForgetPassword(uuid, token).subscribe(
          (response: any) => {
            if (response.result === 'true') {
              this.router.navigate(['account/resetpassword/succcess']);
            } else {
              if (response.info === 'Link tidak valid') {
                this.router.navigate(['account/resetpassword/invalid']);
              } else if (response.info === 'Link expired') {
                this.router.navigate(['account/resetpassword/expired']);
              }
            }
          },
          (err: any) => {
            // console.log(err);
            if (err instanceof HttpErrorResponse) {
              if (err.status === 404) {
                this.router.navigate(['not404found']);
              }
            }
        });
      }
    });
  }

}
