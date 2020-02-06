import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { LoadingBarService, DataService } from 'pilar';

import { BillService, BillServiceType } from '../../../services/bill.service';

@Component({
  selector: 'ugw-bill-dispensation-list',
  templateUrl: './dispensation-list.component.html',
  styleUrls: ['./dispensation-list.component.css']
})

export class DispensationListComponent implements OnInit {
  public columns:Array<any> = [];
  public rows: Array<any> = [];
  public showTable = true;

  besar_nominal: string;  
  besar_potongan: string;  
  dataShared: any;
  komponen: string;
  nama_potongan: string;  
  tagihan_awal: any;
  tagihan_akhir: string;

  constructor(
    public activeModal: BsModalRef,
    private dataSvc: DataService,    
    private slimLoadingBarSvc: LoadingBarService,

    private billSvc: BillService    
  ) { }

  ngOnInit() {
    this.initDataTable();
  }

  private initDataTable() {
    this.slimLoadingBarSvc.start();
    this.dataShared = this.dataSvc.getData();

    this.komponen = this.dataShared.nama_komponen;
    this.tagihan_awal = this.dataShared.besar_tagihan;
    this.besar_potongan = this.dataShared.besar_potongan;
    this.tagihan_akhir = this.dataShared.total_tagihan;

    if (this.dataShared.detail_potongan != null){
      this.rows = this.dataShared.detail_potongan;
      this.nama_potongan = this.rows[0].nama_potongan;  
      this.besar_nominal = this.rows[0].besar_potongan;
    }
  }
}
