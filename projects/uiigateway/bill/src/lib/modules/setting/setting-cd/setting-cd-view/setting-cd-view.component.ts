import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'ugw-bill-setting-cd-view',
  templateUrl: './setting-cd-view.component.html',
  styleUrls: ['./setting-cd-view.component.css']
})
export class SettingCdViewComponent implements OnInit {

  constructor(public activeModal: BsModalRef) { }

  ngOnInit() {
  }

}
