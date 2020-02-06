import { Injectable, Inject } from '@angular/core';
import { HttpService } from 'pilar';
import { Observable } from 'rxjs';

import { ENV, Config } from '../bill.config';

export enum BillServiceType {
  BILL_STUDENT_ALL_BILL,
  BILL_STUDENT_COUNT,  
  BILL_STUDENT_DETAIL,
  BILL_STUDENT_DISPENSATION_DETAIL,
  BILL_STUDENT_NOT_PAYED_BILL,
  BILL_STUDENT_OVERVIEW,
  BILL_STUDENT_PAYED_BILL
}

@Injectable({
  providedIn: 'root'
})

export class BillService {
  private BASE_URL_API_NEW: string;

  constructor(
    @Inject(ENV) private config: Config,
    private httpSvc: HttpService
  ) { 
    this.BASE_URL_API_NEW = config.apiUrl;
  }

  getUrl(serviceType: BillServiceType) {
    let url: string;
    switch(serviceType) {
      case BillServiceType.BILL_STUDENT_ALL_BILL:
      url = this.BASE_URL_API_NEW + '/v1/finance/bill/spp-catur-dharma/bills';
      break;
      case BillServiceType.BILL_STUDENT_COUNT:
      url = this.BASE_URL_API_NEW + '/v1/finance/bill/spp-catur-dharma/bill-count';
      break;
      case BillServiceType.BILL_STUDENT_DETAIL:
      url = this.BASE_URL_API_NEW + '/v1/finance/bill/spp-catur-dharma/bill-details';
      break;
      case BillServiceType.BILL_STUDENT_DISPENSATION_DETAIL:
      url = this.BASE_URL_API_NEW + '/v1/finance/bill/spp-catur-dharma/bill-discount';
      break;
      case BillServiceType.BILL_STUDENT_NOT_PAYED_BILL:
      url = this.BASE_URL_API_NEW + '/v1/finance/bill/spp-catur-dharma/bills?status_bayar=Belum Bayar';
      break;
      case BillServiceType.BILL_STUDENT_OVERVIEW:
      url = this.BASE_URL_API_NEW + '/v1/finance/bill/spp-catur-dharma/bills-chart';
      break;
      case BillServiceType.BILL_STUDENT_PAYED_BILL:
      url = this.BASE_URL_API_NEW + '/v1/finance/bill/spp-catur-dharma/bills?status_bayar=Terbayar Lunas';
      break;
    }
    return url;
  }

  countBill(serviceType: BillServiceType, params?: any): Observable<any> {
    return this.httpSvc.get(this.getUrl(serviceType), params);
  }

  detail(serviceType: BillServiceType, params?: any): Observable<any> {
    return this.httpSvc.get(this.getUrl(serviceType), params);
  }

  detailDispensation(serviceType: BillServiceType, params?: any): Observable<any> {
    return this.httpSvc.get(this.getUrl(serviceType), params);
  }

  listAll(serviceType: BillServiceType, params?: any): Observable<any> {
    return this.httpSvc.get(this.getUrl(serviceType), params);
  }

  listOverview(serviceType: BillServiceType, params?: any): Observable<any> {
    return this.httpSvc.get(this.getUrl(serviceType), params);
  }
} 
