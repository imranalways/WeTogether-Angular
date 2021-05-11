import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseURLService } from './base-url.service';
import { Chartmodel } from './chartmodel.model';


@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private http:HttpClient,public baseurl:BaseURLService) { }

  chartList:Chartmodel[];
  chartData:Chartmodel=new Chartmodel();
  readonly baseURL = baseurl '/api/Chart';

  getChartData(){
    return this.http.get(this.baseURL)
    .toPromise()
    .then(res=>this.chartList=res as Chartmodel[]);
  }
}
