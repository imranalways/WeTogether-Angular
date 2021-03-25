import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../shared/profile.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {

  constructor(public service:ProfileService,private activatedRoute: ActivatedRoute) { }

  userid:any=localStorage.getItem('UserId');
  UrlId:String;
  ngOnInit(): void {
    this.UrlId = this.activatedRoute.snapshot.paramMap.get('id');
    this.service.formData.UserId=this.UrlId;
    console.log(this.UrlId);
    this.service.getUserById();
    console.log(this.service.formData.Name);
    
  }

}
