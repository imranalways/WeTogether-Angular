import { Component, OnInit } from '@angular/core';
import { ChartService } from '../shared/chart.service';
import {Chart} from 'chart.js';

// import{ Chartmodel } from '../shared/chartmodel.model'

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  public canvas: any;
  public ctx: any;
  public labels: any = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  public dataCases: any = {
    chart1: [2000, 10000, 12000, 14000, 6000, 0, 0, 0, 0, 0, 0, 0],
    chart2: [200, 1000, 1200, 1400, 600, 0, 0, 0, 0, 0, 0, 0]
  };

  constructor(public service:ChartService) {}

  ngOnInit(){
    this.createLineChart(this.labels, this.dataCases, 'myChart');
  }
  private createLineChart(labels, dataCases, chartId) {
    this.canvas = document.getElementById(chartId);
    this.ctx = this.canvas.getContext('2d');

    let chart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: "Chart 1",
          data: dataCases.chart1,
          backgroundColor: '#ffbb33',
          borderColor: '#ffbb33',
          fill: false,
          borderWidth: 2
        },
        {
          label: "Chart 2",
          data: dataCases.chart2,
          backgroundColor: '#ff4444',
          borderColor: '#ff4444',
          fill: false,
          borderWidth: 2
        }]
      },
      options: {
        hover: {
          mode: 'nearest',
          intersect: true
        },
        
      }
    });
}
}