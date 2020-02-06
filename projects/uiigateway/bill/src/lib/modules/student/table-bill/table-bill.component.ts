import { CurrencyPipe } from '@angular/common';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AuthorizationModel } from '@uiigateway/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { LoadingBarService, DataService, MODAL } from 'pilar';

import { ViewBillComponent } from '../view-bill/view-bill.component';
import { BillService, BillServiceType } from '../../../services/bill.service';

@Component({
  selector: 'ugw-bill-table-bill',
  templateUrl: './table-bill.component.html',
  styleUrls: ['./table-bill.component.css'],
  providers: [CurrencyPipe]
})

export class TableBillComponent implements OnInit {
  public columns: Array<any> = [];
  public modalRef: BsModalRef;  
  public rows: Array<any> = [];

  dataComponent: any;
  showTable = true;
  status_tagihan: any;

  constructor(
    private currencyPipe: CurrencyPipe, 
    private dataSvc: DataService,  
    private location: Location,   
    private modalSvc: BsModalService,  
    private route: ActivatedRoute,            
    private slimLoadingBarSvc: LoadingBarService,

    private billSvc: BillService
  ) { }

  ngOnInit() {
    this.initSetColumnDataTable();
    this.initSetRowsDataTable(); 
  }

  getFilterChart(jenis, status) {
    this.billSvc.listAll(BillServiceType.BILL_STUDENT_ALL_BILL, { 'status_bayar': status, 'jenis_tagihan': jenis }).subscribe(
      (response) => {
        this.slimLoadingBarSvc.complete();
        this.showTable = true;
        const data = response.data;
        data.forEach(element => {
          element.class = this.setLabelClass(element.status_bayar);
          element.auth = new AuthorizationModel();
          element.auth.canRead = true;
          element.batas_pembayaran = this.mapDateData(new Date (element.batas_pembayaran));  
          if (element.status_bayar === "Belum Bayar") {
            element.tanggal_bayar = '-';
          } else {
            element.tanggal_bayar = this.mapDateData(new Date (element.tanggal_bayar));                                    
          }       
          element.total_tagihan = this.currencyPipe.transform(element.total_tagihan, 'IDR', 'Rp ');            
        });
        this.rows = data;  
      }
    )
  }

  private initSetColumnDataTable() {
    this.columns = [
      {
        name: 'No',
        prop: 'number'
      },
      {
        name: 'No. tagihan',
        prop: 'no_tagihan'
      },
      {
        name: 'Jenis tagihan',
        prop: 'nama_tagihan'
      },
      {
        name: 'Nominal',
        prop: 'total_tagihan'
      },
      {
        name: 'Status bayar',
        prop: 'status_bayar',
        type: 'label'
      },
      {
        name: 'Batas akhir pembayaran',
        prop: 'batas_pembayaran'
      },
      {
        name: 'Tanggal bayar',
        prop: 'tanggal_bayar'
      }
    ]
  }

  public initSetRowsDataTable() {
    this.slimLoadingBarSvc.start();
    this.showTable = false;

    let data = this.dataSvc.getData();
    let jenisTagihan = data[0];
    let statusBayar = data[1];    

    if (data == "terbayarlunas") {
      this.billSvc.listAll(BillServiceType.BILL_STUDENT_PAYED_BILL).subscribe(
        (responses) => {
          this.slimLoadingBarSvc.complete();
          this.showTable = true;
          const data = responses.data;
          data.forEach(element => {
            element.class = this.setLabelClass(element.status_bayar);
            element.auth = new AuthorizationModel();
            element.auth.canRead = true;
            element.batas_pembayaran = this.mapDateData(new Date (element.batas_pembayaran));
            element.tanggal_bayar = this.mapDateData(new Date (element.tanggal_bayar));
            element.total_tagihan = this.currencyPipe.transform(element.total_tagihan, 'IDR', 'Rp ');                        
          });
          this.rows = data;
      });
    } else if (data == "belumbayar") {
      this.billSvc.listAll(BillServiceType.BILL_STUDENT_NOT_PAYED_BILL).subscribe(
        (responses) => {
          this.slimLoadingBarSvc.complete();
          this.showTable = true;
          const data = responses.data;
          data.forEach(element => {
            element.class = this.setLabelClass(element.status_bayar);
            element.auth = new AuthorizationModel();
            element.auth.canRead = true;
            element.batas_pembayaran = this.mapDateData(new Date (element.batas_pembayaran));  
            element.tanggal_bayar = '-';     
            element.total_tagihan = this.currencyPipe.transform(element.total_tagihan, 'IDR','Rp ');
          });
          this.rows = data;
      });
    } else if (data == 'all') {
      this.billSvc.listAll(BillServiceType.BILL_STUDENT_ALL_BILL).subscribe(
        (responses) => {
          this.slimLoadingBarSvc.complete();
          this.showTable = true;
          const data = responses.data;
          data.forEach(element => {
            element.class = this.setLabelClass(element.status_bayar);
            element.auth = new AuthorizationModel();
            element.auth.canRead = true;
            element.batas_pembayaran = this.mapDateData(new Date (element.batas_pembayaran));  
            if (element.status_bayar === "Belum Bayar") {
              element.tanggal_bayar = '-';
            } else {
              element.tanggal_bayar = this.mapDateData(new Date (element.tanggal_bayar));                                    
            }       
            element.total_tagihan = this.currencyPipe.transform(element.total_tagihan, 'IDR', 'Rp ');            
          });
          this.rows = data;        
      });
    } else {
      this.getFilterChart(jenisTagihan, statusBayar);
    }
  }

  mapDateData(date: Date) {
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    return date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
  }

  public onBtnBack() {
    this.location.back();
  }

  public onClickBtnView(component) {
    this.dataSvc.setData(component.no_tagihan);
    this.modalSvc.config.class = MODAL.DETAIL.LARGE;
    this.modalRef = this.modalSvc.show(ViewBillComponent);
  }

  private setLabelClass(status_bayar) {
    switch (status_bayar) {
      case 'Belum Bayar':
        return 'label-warning';
      case 'Terbayar Lunas':
        return 'label-success';
      default:
        return 'label-default';
    }
  }
}
