import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'pilar';

@Component({
  selector: 'ugw-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'ugw';

  constructor(
    private translateSvc: TranslateService
  ) {}

  ngOnInit() {
    // set language
    this.translateSvc.setDefaultLang('id');
    this.translateSvc.enableFallback(true);
  }
}
