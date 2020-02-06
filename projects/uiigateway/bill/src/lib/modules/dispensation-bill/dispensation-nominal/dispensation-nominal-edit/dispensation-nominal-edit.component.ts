import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'ugw-bill-dispensation-nominal-edit',
  templateUrl: './dispensation-nominal-edit.component.html',
  styleUrls: ['./dispensation-nominal-edit.component.css']
})
export class DispensationNominalEditComponent implements OnInit {

  public columns: Array<any> = [];
  public rows = [];

  constructor(public activeModal: BsModalRef) { }

  ngOnInit() {
  }

}
