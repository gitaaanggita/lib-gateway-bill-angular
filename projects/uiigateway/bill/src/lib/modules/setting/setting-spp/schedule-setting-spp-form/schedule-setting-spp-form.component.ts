import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap';
import { Paginate, ConfigService, MODAL } from 'pilar';

import { SettingSppComponentInputFormComponent } from '../setting-spp-component-input-form/setting-spp-component-input-form.component';

@Component({
  selector: 'ugw-bill-schedule-setting-spp-form',
  templateUrl: './schedule-setting-spp-form.component.html',
  styleUrls: ['./schedule-setting-spp-form.component.css']
})
export class ScheduleSettingSppFormComponent implements OnInit {

  public columns: Array<any> = [];
  public rows = [];

  public paginateLabel: Paginate;
  public wizard1Counter: number = 0;
  public wizardTitle1: string = 'Pengaturan Jadwal';
  public wizardSubTitle1: string = 'Langkah 1';
  public wizardTitle2: string = 'Input Komponen';
  public wizardSubTitle2: string = 'Langkah 2';

  public formStatus: string;
  public settingForm: FormGroup;

  constructor(
    private configSvc: ConfigService,    
    private location: Location,
    private modalSvc: BsModalService
  ) { }

  ngOnInit() {
    this.initPaginateLabel();
    this.initSetColumnDataTable();
  }

  private initSetColumnDataTable() {
    this.columns = [
      {
        name: 'No',
        prop: 'number'
      },
      {
        name: 'Angkatan',
        prop: 'angkatan'
      },
      {
        name: 'Total 100%',
        prop: 'seratus'
      },
      {
        name: 'Total 50%',
        prop: 'setengah'
      }
    ]
  }

  public initPaginateLabel() {
    this.paginateLabel = this.configSvc.paginateConfig();
  }

  onBtnAddClick(data: any) {
    const modalSettingSppComponentInputForm = this.modalSvc.show(SettingSppComponentInputFormComponent, {class: MODAL.DETAIL.LARGE });
    (<SettingSppComponentInputFormComponent>modalSettingSppComponentInputForm.content).showSettingSppComponentInput({
      componentInput: data
    });
  }

  onBtnBackClick() {
    this.location.back();
  } 

  onCompleteWizard() {

  }

  onNextWizard1() {

  }

}
