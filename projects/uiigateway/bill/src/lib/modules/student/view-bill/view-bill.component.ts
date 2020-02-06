import { CurrencyPipe } from '@angular/common';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationModel } from '@uiigateway/core';
import { BsModalRef, BsModalService, DateFormatter } from 'ngx-bootstrap';
import { LoadingBarService, DataService, MODAL } from 'pilar';

import { DispensationListComponent } from '../dispensation-list/dispensation-list.component';
import { BillService, BillServiceType } from '../../../services/bill.service';

@Component({
  selector: 'ugw-bill-view-bill',
  templateUrl: './view-bill.component.html',
  styleUrls: ['./view-bill.component.css'],
  providers: [CurrencyPipe]
})

export class ViewBillComponent implements OnInit {
  public bankTableColumns: Array<any> = [];  
  public bankTableRows: Array<any> = [];  
  public componentTableColumns:Array<any> = [];
  public componentTableRows: Array<any> = [];
  public modalRef: BsModalRef;

  batas_pembayaran: string;  
  component: string;
  jenis_tagihan: string;
  total_tagihan: string;

  constructor(
    public activeModal: BsModalRef,
    private currencyPipe: CurrencyPipe,    
    private dataSvc: DataService,   
    private location: Location,   
    private modalSvc: BsModalService,   
    private router: Router,       
    private slimLoadingBarSvc: LoadingBarService,

    private billSvc: BillService,    
  ) { }

  ngOnInit() {
    this.initSetRowsDataTable();
    this.initSetColumnDataTable();
  }

  private  initSetColumnDataTable() {
    this.componentTableColumns = [
      {
        name: 'No',
        prop: 'number'
      },
      {
        name: 'Komponen',
        prop: 'nama_komponen'
      },
      {
        name: 'Tagihan awal (Rp)',
        prop: 'besar_tagihan'
      },
      {
        name: 'Potongan (Rp)',
        prop: 'besar_potongan'
      },
      {
        name: 'Total akhir (Rp)',
        prop: 'total_tagihan'
      }
    ];

    this.bankTableColumns = [
      {
        name: 'No',
        prop: 'number'
      },
      {
        name: 'Bank',
        prop: 'nama_bank'
      },
      {
        name: 'ATM',
        prop: 'atm',
        type: 'html'
      },
      {
        name: 'Teller',
        prop: 'teller',
        type: 'html'
      },
      {
        name: 'Internet banking',
        prop: 'internet_banking',
        type: 'html'
      },
      {
        name: 'Mobile banking',
        prop: 'mobile_banking',
        type: 'html'
      }
    ]
  }

  private initSetRowsDataTable() {
    this.slimLoadingBarSvc.start();
    this.component = this.dataSvc.getData();  

    this.billSvc.detail(BillServiceType.BILL_STUDENT_DETAIL,{ 'no_tagihan': this.component }).subscribe(
      (responses) => {
        this.slimLoadingBarSvc.complete();

        const data = responses.data;
        data.bank_pembayaran.forEach(bank => {
          bank.atm = this.setLabelClass(bank.atm);
          bank.teller = this.setLabelClass(bank.teller);
          bank.internet_banking = this.setLabelClass(bank.internet_banking);
          bank.mobile_banking = this.setLabelClass(bank.mobile_banking);
        });

        data.komponen_tagihan.forEach(element => {
          element.auth = new AuthorizationModel();
          element.auth.canRead = true;
          element.besar_potongan = this.currencyPipe.transform(element.besar_potongan, 'IDR', 'Rp ');
          element.besar_tagihan = this.currencyPipe.transform(element.besar_tagihan, 'IDR', 'Rp ');          
          element.total_tagihan = this.currencyPipe.transform(element.total_tagihan, 'IDR', 'Rp ');
        });

        this.component = data.no_tagihan;
        this.jenis_tagihan = data.nama_tagihan;
        this.batas_pembayaran = data.batas_pembayaran;
        this.bankTableRows = data.bank_pembayaran;
        this.componentTableRows = data.komponen_tagihan;   
      });
    }

    public onClickBtnView(potongan) {
      this.dataSvc.setData(potongan);   
      this.modalSvc.config.class = MODAL.DETAIL.SMALL;
      this.modalRef = this.modalSvc.show(DispensationListComponent);
    }

    private setLabelClass(flag): string {
      if (flag == '1'){
        return '<i class="fa fa-check text-green"></i>';
      } else {
        return '<i class="fa fa-minus text-gray"></i>';
      }
    }
} 
