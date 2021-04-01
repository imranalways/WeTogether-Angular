import { Component, OnInit } from '@angular/core';
import { PostsService } from '../shared/posts.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  constructor(public service:PostsService) {
    
   }

   
 

  PrivacyList:String[]=[
    'Friends',
    'Only Me'
  ];

  Name:any=localStorage.getItem('Name');
  userid:String=localStorage.getItem('UserId');
  error:String="hasError";
  ngOnInit(): void {
    if(this.userid != null){
      this.error="";
    }
    if(this.service.formData.PostPrivacy==""){
      this.service.formData.PostPrivacy='Public';
    }
    this.service.formData.PostBody="";
    console.log(this.PrivacyList);
    console.log(this.service.getAllPosts());
    this.service.getLikes();
    console.log(this.service.list);
    if(this.service.list==undefined){
      this.checker=true;
    }
    console.log(this.service.likes);
  }



 
  LikeClicked(Id:String){
    this.service.formData.Likes=1;
    this.service.formData.PostId=Id;
    this.service.formData.UserId=this.userid;
    this.service.LikesInsert().subscribe(
        res=>{
          this.service.getLikes();
        },
        err=>{
          console.log(err);
        }
      )
  }
 
  onSubmit(form:NgForm){
    this.service.submitPost().subscribe(
      res=>{
        this.ngOnInit();
        this.service.formData.PostBody="";
      },
      err=>{
        console.log(err);
      }
    )
  }

  optionClicked(){
    console.log("Okk");
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

  unliked(){
    this.txt="";
  }
  sec:number;
  minutes:number;
  hours:number;
  day:number;
  date:Date;
  dateToday: number = Date.now();

  agoTime:String="";


  postDate(postdate:number){
    const diffInMilliseconds = Math.abs(this.dateToday-new Date(postdate).valueOf());
    

    this.sec=diffInMilliseconds/1000
    this.minutes=this.sec/60;
    this.hours=this.minutes/60;
    this.day=this.hours/24;
    
    if(this.day>=7){
      this.agoTime=postdate+"";
    }
    else if(this.hours>=24){
      this.agoTime= Math.floor(this.day)+" d";
    }
    else if(this.minutes>=60){
      this.agoTime= Math.floor(this.hours)+" h";
    }
    else if(this.minutes>=1){
      this.agoTime= Math.floor(this.minutes)+" m";
    }
    else if(this.sec<60){
      this.agoTime="Just now";
    }
  }


}
