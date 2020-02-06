import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ugw-bill-dispensation-nominal',
  templateUrl: './dispensation-nominal.component.html',
  styleUrls: ['./dispensation-nominal.component.css']
})
export class DispensationNominalComponent implements OnInit {

  public columns: Array<any> = [];
  public rows = [];
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
        name: 'Komponen',
        prop: 'komponen'
      },
      {
        name: 'Tagihan awal (Rp)',
        prop: 'tagihan_awal'
      },
      {
        name: 'Potongan (Rp)',
        prop: 'potongan'
      },
      {
        name: 'Total setelah dipotong (Rp)',
        prop: 'total'
      }
    ]
  }

}
