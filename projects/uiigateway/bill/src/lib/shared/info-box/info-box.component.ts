import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'pilar';

import { BillService, BillServiceType } from '../../services/bill.service';

@Component({
  selector: 'ugw-bill-info-box',
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.css']
})

export class InfoBoxComponent implements OnInit {
  billCount: any = {};
  paidClick: boolean;

  constructor(
    private router: Router,
    private dataSvc: DataService,

    private billSvc: BillService,    
  ) { }

  ngOnInit() {
    this.getBillCount();
  }

  getBillCount() {
    this.billSvc.countBill(BillServiceType.BILL_STUDENT_COUNT).subscribe(
      (responses) => {
        this.billCount = responses.data;
      }
    )
  }

  onAllClicked(){
    this.router.navigate([this.router.url + '/read']);
    this.dataSvc.setData('all');
  }

  onNotPaidClicked(){
    this.router.navigate([this.router.url + '/read']);
    this.dataSvc.setData('belumbayar');
  }

  onPaidClicked() {
    this.router.navigate([this.router.url + '/read']);
    this.dataSvc.setData('terbayarlunas');
  }
}
