import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'ugw-bill-setting-spp-component-input-form',
  templateUrl: './setting-spp-component-input-form.component.html',
  styleUrls: ['./setting-spp-component-input-form.component.css']
})
export class SettingSppComponentInputFormComponent implements OnInit {

  public componentInput: any;

  constructor(
    public activeModal: BsModalRef
  ) { }

  ngOnInit() {
  }

  public showSettingSppComponentInput(config: { componentInput }) {
    this.componentInput = config.componentInput;
  }
 
}
