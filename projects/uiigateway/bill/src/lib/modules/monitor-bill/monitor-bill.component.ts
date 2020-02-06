import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { BillService } from '../../services/bill.service';

@Component({
  selector: 'ugw-bill-monitor-bill',
  templateUrl: './monitor-bill.component.html',
  styleUrls: ['./monitor-bill.component.css']
})
export class MonitorBillComponent implements OnInit {

  public columns: Array<any> = [];
  public rows: Array<any> = [];
  public showTable = true;
  selectOption: any = {
    jenis_tagihan: {
      defaultValue: 'all',
      formControl: new FormControl,
      items: []
    },
    periode: {
      defaultValue: 'all',
      formControl: new FormControl,
      items: []
    },
    status_bayar: {
      defaultValue: 'all',
      formControl: new FormControl,
      items: []
    }
  }

  constructor(
    private router: Router,
    
    private billSvc: BillService
  ) { }

  ngOnInit() {
    this.initSetColumnDataTable();
  }

  private initSetColumnDataTable() {
    this.columns = [
      {
        name: 'No',
        prop: 'number',
        type: 'number'
      },
      {
        name: 'No. tagihan',
        prop: 'no_tagihan'
      },
      {
        name: 'Nama',
        prop: 'name'
      },
      {
        name: 'Jenis tagihan',
        prop: 'jenis_tagihan'
      },
      {
        name: 'Nominal',
        prop: 'nominal'
      },
      {
        name: 'Batas akhir pembayaran',
        prop: 'batas_akhir'
      },
      {
        name: 'Status bayar',
        prop: 'status'
      }
    ]
  }

  onSelectOption(type: string, value: any) {}


}
