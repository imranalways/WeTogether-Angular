import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../shared/profile.service';
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  constructor(public service:ProfileService,private activatedRoute: ActivatedRoute) { 
    console.log("Okk");
  }

  userid:any=localStorage.getItem('UserId');
  UrlId:String;

  
  ngOnInit(): void {
    this.UrlId = this.activatedRoute.snapshot.paramMap.get('id');
    if(this.UrlId !='me'){
      this.service.formData.UserId=this.UrlId;
    }
    else{
      this.UrlId=this.userid
      this.service.formData.UserId=this.UrlId;
    }
    console.log(this.UrlId);
    console.log(this.service.getUserById());
    console.log(this.service.formData)
  }


}
