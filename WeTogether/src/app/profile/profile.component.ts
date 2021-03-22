import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../shared/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public service:ProfileService) { }

  ngOnInit(): void {
    console.log(this.service.getUserById());
    console.log(this.service.list)
  }

}
