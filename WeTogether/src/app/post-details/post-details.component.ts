import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../shared/posts.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  constructor(public service:PostsService,private activatedRoute: ActivatedRoute,public router:Router) { }
  
  UrlId:String;
  userid:String=localStorage.getItem('UserId');
  Name:any=localStorage.getItem('Name');
  error:String="hasError";

  PrivacyList:String[]=[
    'Friends',
    'Only Me'
  ];

  ngOnInit(): void {
    
    if(this.userid != null){
      this.error="";
    }
    
    this.UrlId = this.activatedRoute.snapshot.paramMap.get('id');
    this.service.getPostsById(this.UrlId);
    
    this.service.getLikes();
    this.service.getCommentsByPostsId(this.UrlId);
    console.log(this.service.comments);
    console.log(this.UrlId)
   
    

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
    console.log("liked");
  }
  unliked(){
    this.txt="";
  }


  comment_count:number=0;
  commented(){
    this.comment_count+=1;
  }

  comment_reset(){
    this.comment_count=0;
  }

  sec:number;
  minutes:number;
  hours:number;
  day:number;
  date:Date;
  week:number;
  month:number;
  dateToday: number = Date.now();
  agoTime:String="";

  getAgoTime(postdate:Date){
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


  getPostById(id:String){
    this.service.getPostsByIdToEdit(id);
  }
  updatePost(){
    this.service.updatePost().subscribe(
      res=>{
        this.ngOnInit();
        console.log(res);
        this.service.editData.PostBody="";
      },
      err=>{
        console.log(err);
      }
    )
  }
  deletePost(){
    this.service.editData.IsDeleted=true;
    this.service.updatePost().subscribe(
      res=>{
        this.router.navigate(['/Posts']);
        console.log(res);
      
      },
      err=>{
        console.log(err);
      }
    )
  }

  getImage(attachment:string){
    localStorage.setItem('Attachment',attachment) 
  }
 
}
