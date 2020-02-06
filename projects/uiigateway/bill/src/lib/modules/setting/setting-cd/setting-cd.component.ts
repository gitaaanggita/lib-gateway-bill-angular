import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'ugw-bill-setting-cd',
  templateUrl: './setting-cd.component.html',
  styleUrls: ['./setting-cd.component.css']
})
export class SettingCdComponent implements OnInit {

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
        name: 'Angsuran',
        prop: 'angsuran'
      },
      {
        name: 'Status',
        prop: 'status'
      }
    ]
  }

  public onBtnAddClick() {
    this.router.navigate([this.router.url + '/create']);
  }

}
