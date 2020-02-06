import { AuthorityModel } from '@uiigateway/core';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingBarService, CoreService } from 'pilar';
import { NOTIFICATION_TYPE } from 'pilar';

import { BillService } from '../../../services/bill.service';

@Component({
  selector: 'ugw-bill-setting-spp',
  templateUrl: './setting-spp.component.html',
  styleUrls: ['./setting-spp.component.css']
})
export class SettingSppComponent implements OnInit {

  public columns: Array<any> = [];
  public rows: Array<any> = [];
  public showTable = true;
  public selectOptions: any = {
    faculty: {
      defaultValue: [],
      formControl: new FormControl(),
      items: [],
      touched: false
    }
  };

  constructor(
    private coreSvc: CoreService,    
    private router: Router,        
    private slimLoadingBarSvc: LoadingBarService,

    private billSvc: BillService
  ) { }

  ngOnInit() {
    this.initSetColumnDataTable();
    this.getListDataTable();
  }

  private initSetColumnDataTable() {
    this.columns = [
      {
        name: 'No',
        prop: 'number',
        type: 'number'
      },
      {
        name: 'Program studi',
        prop: 'program_studi'
      },
      {
        name: 'Periode',
        prop: 'periode'
      },
      {
        name: 'Angsuran',
        prop: 'angsuran'
      },
      {
        name: 'Status',
        prop: 'status_terbit'
      }
    ]
  }

  public getListDataTable() {
    let body;
    if (this.selectOptions !== '') {
      body = {
        'kd_fakultas': this.selectOptions
      };
    }
    this.slimLoadingBarSvc.start();
    // this.showTable = false;

    // this.billSvc.list().subscribe(response => {
    //   this.slimLoadingBarSvc.complete();
    //   this.showTable = true;

    //   const data = response.data;
    //   data.forEach(element => {
    //     element.class = this.setLabelClass(element.status_terbit);
    //     element.auth = new AuthorityModel();
    //     element.auth.canRead = true;
    //   });
    //   this.rows = data;
    // });  
  }

  private handleResponse(response) {
    if (typeof response.info === 'string') {
      this.coreSvc.growl(
        NOTIFICATION_TYPE.SUCCESS,
        response.info,
        () => {},
        1000
      );
    }
  }

  public onBtnAddClick() {
    this.router.navigate([this.router.url + '/create']);
  }

  private setLabelClass(status_terbit) {
    switch (status_terbit) {
      case 'Draft':
        return 'label-warning';
      case 'Valid':
        return 'label-success';
      default:
        return 'label-default';
    }
  }

}
