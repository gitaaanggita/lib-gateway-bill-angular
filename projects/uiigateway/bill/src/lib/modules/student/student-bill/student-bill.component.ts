import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'angular-highcharts';
import { DataService } from 'pilar';

import { BillService, BillServiceType } from '../../../services/bill.service';

@Component({
  selector: 'ugw-bill-student-bill',
  templateUrl: './student-bill.component.html',
  styleUrls: ['./student-bill.component.css']
})

export class StudentBillComponent implements OnInit {
  categoriesData = [];
  categoryList = ['SPP', 'Dana Catur Dharma', 'Remediasi', 'KKN', 'Tugas akhir'];  
  chartOptions: any = {};  
  chartOverviewData: any;
  chartSeriesData = [
    {
      name: 'Terbayar Lunas',
      color: '#4db6ac',
      data: []
    }, {
      name: 'Belum Bayar',
      color: '#ff5252',
      data: []
    }
  ];
  dataChart: Array<any> = [];  
  dataLength: number;
  periodName: string;
  showChartContent = false;  
  showOverviewContent = false;

  constructor(
    private router: Router,
    private dataSvc: DataService,

    private billSvc: BillService
  ) {}

  ngOnInit() {
    this.getDataBills();
  }

  private attachChartValueToDefault() {
    this.chartSeriesData[0].data = [];
    this.chartSeriesData[1].data = [];
    this.categoriesData = [];
    this.dataLength = 0;
  }

  private attachChartValueToResponse(response: any) {
    this.chartSeriesData[0].data = [];
    this.chartSeriesData[1].data = [];
    const responseData = response.data[0];
    this.periodName = response.data.periode.periode;
    // for (const key in response.data.data_chart.tagihan_sudah_dibayar) {
    //   if (response.data.data_chart.tagihan_sudah_dibayar.hasOwnProperty(key)) {
    //     this.chartSeriesData[0].data.push(Number(response.data.data_chart.tagihan_sudah_dibayar[key])); 
    //   }
    // }
    this.chartSeriesData[0].data.push(Number(response.data.data_chart.tagihan_sudah_dibayar.spp));
    this.chartSeriesData[0].data.push(Number(response.data.data_chart.tagihan_sudah_dibayar.catur_dharma));
    this.chartSeriesData[1].data.push(Number(response.data.data_chart.tagihan_belum_dibayar.spp));
    this.chartSeriesData[1].data.push(Number(response.data.data_chart.tagihan_belum_dibayar.catur_dharma));
  }

  getDataBills() {
    this.showChartContent = (this.showOverviewContent) ? false : true;
    this.billSvc.listOverview(BillServiceType.BILL_STUDENT_OVERVIEW).subscribe(response => {
      if (response.responseStatusError || response.data.data_chart.total_tagihan.spp === "0") {
        this.periodName = '';
        this.attachChartValueToDefault();
      } else {
        this.attachChartValueToResponse(response);
        this.periodName = response.data.periode.periode;
        this.dataChart = response.data.data_chart;
      }
      this.mapChartOverviewData();
      this.showChartContent = true;
      this.showOverviewContent = true;
      this.initChartData();
    });
  }

  private initChartData() {
    this.chartOptions = new Chart({
      lang:  {
        noData: 'Tidak ada data yang ditampilkan'
      },
      chart: {
        type: 'bar',
        style: {
          fontFamily: 'Roboto',
        },
      },
      title: {
        text: 'Rekap tagihan',
        style: {
          fontSize: '14',
          color: '#666666',
          fontWeight: 'bold'
        }
      },
      subtitle: {
        text: 'Periode: '+ this.periodName,
        style: {
          fontSize: '12',
          fontWeight: 'bold'
        }
      },
      xAxis: {
        categories: this.categoryList,
        title: {
          text: 'Jenis tagihan',
          style: {
            fontWeight: 'bold',
            fontSize: '11'
          },
          margin: 15
        },
      },
      yAxis: {
        title: {
          text: 'Jumlah tagihan',
          style: {
            fontWeight: 'bold',
            fontSize: '11'
          },
          margin: 20
        },
        tickInterval: 1,
        reversedStacks: false,
        stackLabels: {
          enabled: false,
        }
      },
      plotOptions: {
        series: {
          stacking: 'normal',
          cursor: 'pointer',
          events: {
            click: (event) => {
              const jenis = event.point.category;  
              const status = event.point.series.name;
              const bar = [
                jenis,
                status
              ]        
              this.onBarPointClicked(bar);
            } 
          }
        }
      },
      noData: {
        style: {
          fontSize: '13',
          fontWeight: 'normal'
        }
      },
      credits: {
        enabled: false
      },
      series: this.chartSeriesData
    });
  }

  private mapChartOverviewData() {
    this.chartOverviewData = {
      chartCategories: this.categoriesData,
      chartSeries: this.chartSeriesData,
      periodName: this.periodName
    }
  }

  onBarPointClicked(bar: any) {
    this.router.navigate([this.router.url + '/read']);
    this.dataSvc.setData(bar);
  }

  private setLabelClass(status_bayar) {
    switch (status_bayar) {
      case 'Belum Bayar':
        return 'label-warning';
      case 'Terbayar Lunas':
        return 'label-success';
      default:
        return 'label-default';
    }
  }
}
