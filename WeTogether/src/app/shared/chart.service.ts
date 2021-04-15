import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chartmodel } from './chartmodel.model';


@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private http:HttpClient) { }

  chart:Chartmodel[];
  chartmodel:Chartmodel=new Chartmodel();
  readonly baseURL = 'https://localhost:44388/api/Chart';

  getChartData(){
    return this.http.get(this.baseURL)
    .toPromise()
    .then(res=>this.chart=res as Chartmodel[]);
  }
}
