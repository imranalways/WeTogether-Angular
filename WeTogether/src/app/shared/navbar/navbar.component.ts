import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostDetailsComponent } from 'src/app/post-details/post-details.component';
import { PostsComponent } from '../../posts/posts.component';
import { PostsService } from '../posts.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( public router:Router,public component:PostsComponent,public postdetails:PostDetailsComponent,public service:PostsService) { }

  userid:any=localStorage.getItem('UserId');
  error:String="hasError";
  
  ngOnInit(): void {
    if(this.userid != null){
      this.error="";
      console.log(this.component.service.notificationList);
      this.service.getAllNotification(this.userid);

    }
  }
  refresh(){
    this.component.ngOnInit();
    
  }

  notifi(){
    
      //this.postdetails.ngOnInit();
  }

  sec:number;
  minutes:number;
  hours:number;
  day:number;
  week:number;
  month:number;
  date:Date;
  dateToday: number = Date.now();
  agoTime:String="";

  getAgoTime(postdate:number){
    const diffInMilliseconds = Math.abs(this.dateToday-new Date(postdate).valueOf());
    

    this.sec=diffInMilliseconds/1000
    this.minutes=this.sec/60;
    this.hours=this.minutes/60;
    this.day=this.hours/24;
    this.week=this.day/7;
    
    if(this.day>=7){
      this.agoTime=Math.floor(this.week)+"w";
    }
    else if(this.hours>=24){
      this.agoTime= Math.floor(this.day)+"d";
    }
    else if(this.minutes>=60){
      this.agoTime= Math.floor(this.hours)+"h";
    }
    else if(this.minutes>=1){
      this.agoTime= Math.floor(this.minutes)+"m";
    }
    else if(this.sec<60){
      this.agoTime="Just now";
    }
  }
}
