import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ugw-bill-generate-bill-view',
  templateUrl: './generate-bill-view.component.html',
  styleUrls: ['./generate-bill-view.component.css']
})
export class GenerateBillViewComponent implements OnInit {

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
        name: 'NIM',
        prop: 'nim'
      },
      {
        name: 'Nama',
        prop: 'name'
      }
    ]
  }

}
