import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'ugw-bill-monitor-bill-view',
  templateUrl: './monitor-bill-view.component.html',
  styleUrls: ['./monitor-bill-view.component.css']
})
export class MonitorBillViewComponent implements OnInit {

  constructor(
    public activeModal: BsModalRef
  ) { }

  ngOnInit() {
  }

}
