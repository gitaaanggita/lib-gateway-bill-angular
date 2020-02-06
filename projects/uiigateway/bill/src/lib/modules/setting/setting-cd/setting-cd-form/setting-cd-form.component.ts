import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ugw-bill-setting-cd-form',
  templateUrl: './setting-cd-form.component.html',
  styleUrls: ['./setting-cd-form.component.css']
})
export class SettingCdFormComponent implements OnInit {

  constructor(
    private location: Location
  ) { }

  ngOnInit() {
  }

  onBtnBackClick() {
    this.location.back();
  }

}
