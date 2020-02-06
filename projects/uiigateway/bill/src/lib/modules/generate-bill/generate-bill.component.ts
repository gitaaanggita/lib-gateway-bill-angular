import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'ugw-bill-generate-bill',
  templateUrl: './generate-bill.component.html',
  styleUrls: ['./generate-bill.component.css']
})
export class GenerateBillComponent implements OnInit {

  public columns: Array<any> = [];
  public rows: Array<any> = [];
  public showTable = true;

  constructor(
    private router: Router
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
        name: 'Program studi',
        prop: 'prod_studi'
      },
      {
        name: 'Periode',
        prop: 'periode'
      },
      {
        name: 'Jenis tagihan',
        prop: 'jenis_tagihan'
      },
      {
        name: 'Angsuran',
        prop: 'angsuran'
      },
      {
        name: 'Status',
        prop: 'status'
      },
      {
        name: 'Keterangan',
        prop: 'ket'
      }
    ]
  }

}
