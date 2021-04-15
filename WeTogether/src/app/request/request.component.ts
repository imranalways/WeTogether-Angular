import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../shared/profile.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  constructor(public service:ProfileService) { }

  ngOnInit(): void {
    console.log(this.service.freqList);
  }

}
