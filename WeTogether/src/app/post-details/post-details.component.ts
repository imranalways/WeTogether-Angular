import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../shared/posts.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  constructor(public service:PostsService,private activatedRoute: ActivatedRoute) { }
  
  UrlId:String;

  ngOnInit(): void {
    this.UrlId = this.activatedRoute.snapshot.paramMap.get('id');
    this.service.getPostsById(this.UrlId);
    this.service.getCommentsByPostsId(this.UrlId);
    console.log(this.service.comments);
    
    

  }

  checkId(Id:String){
    console.log(Id);
  }

  optionClicked(){
    console.log("Okk");
  }

  CommentSubmit(form:NgForm){
    this.service.CommentSubmit().subscribe(
      res=>{
        
         this.ngOnInit();
         this.service.comment.CommentBody="";
      },
      err=>{
        console.log(err);
      }
    )
  }

  c:number=0;
checker:boolean=false;
  count(){
    this.c+=1;
    
   this.checker=true;
  }
  reset(){
    this.c=0;
  }

  ckreset(){
    this.chk=false;
  }

  txt:String;
  chk:boolean=false;
  liked(){
    this.txt="Liked";
    this.chk=true;
  }



  sec:number;
  minutes:number;
  hours:number;
  day:number;
  date:Date;
  dateToday: number = Date.now();
  agoTime:String="";

  getAgoTime(postdate:Date){
    const diffInMilliseconds = Math.abs(this.dateToday-new Date(postdate).valueOf());
    

    this.sec=diffInMilliseconds/1000
    this.minutes=this.sec/60;
    this.hours=this.minutes/60;
    this.day=this.hours/24;
    
    if(this.day>=7){
      this.agoTime=postdate+"";
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
