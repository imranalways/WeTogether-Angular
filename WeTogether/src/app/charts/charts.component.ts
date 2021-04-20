import { Component, OnInit } from '@angular/core';
import { ChartService } from '../shared/chart.service';
import { ChartDataSets, ChartOptions,ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  

  constructor(public service:ChartService) {}
  
  total:number;
  ngOnInit(){
    console.log(this.service.chartList);
  }


  barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
  };
  barChartLabels: Label[] = ['Toatal Users', 'Male Users', 'Female Users', 'Others'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [this.service.chartData.TotalUser, this.service.chartData.MaleUser, this.service.chartData.FemaleUser, 0], label: 'Users'},
  ];


  
  // lineChartData: ChartDataSets[] = [
  //   { data: [65, 59, 80, 81, 56, 55, 40], label: 'Product A' },
  //   { data: [28, 48, 40, 19, 86, 27, 90], label: 'Product B' }
  // ];

  // lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  // lineChartOptions: ChartOptions = {
  //   responsive: true
  // };

  // // Define colors of chart segments
  // lineChartColors: Color[] = [

  //   { // dark grey
  //     backgroundColor: 'rgba(77,83,96,0.2)',
  //     borderColor: 'rgba(77,83,96,1)',
  //   },
  //   { // red
  //     backgroundColor: 'rgba(255,0,0,0.3)',
  //     borderColor: 'red',
  //   }
  // ];

  // lineChartLegend = true;


  // lineChartType = 'line';

  // lineChartPlugins = [];

 
  // chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  //   console.log(event, active);
  // }

  // chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  //   console.log(event, active);
  // }
}