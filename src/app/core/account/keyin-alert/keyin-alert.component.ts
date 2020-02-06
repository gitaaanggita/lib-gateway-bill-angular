import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'ugw-keyin-alert',
  templateUrl: './keyin-alert.component.html',
  styleUrls: ['./keyin-alert.component.scss']
})
export class KeyinAlertComponent implements OnInit {

  constructor(public activeModal: BsModalRef) { }

  ngOnInit() {
  }

}
