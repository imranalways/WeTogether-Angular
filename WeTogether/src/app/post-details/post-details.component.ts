import { Component, Injectable, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PostsService } from '../shared/posts.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  constructor(public service:PostsService,private activatedRoute: ActivatedRoute,public router:Router) { 
    window.scroll(0,0);
  }
  
  imageSrc: string;

  onFileChange(event) {
   const reader = new FileReader();
   
   if(event.target.files && event.target.files.length) {
     const [file] = event.target.files;
     reader.readAsDataURL(file);
   
     reader.onload = () => {
  
       this.imageSrc = reader.result as string;  
       console.log(this.imageSrc);
       this.service.editData.Attachment=this.imageSrc;
     };
  
   }
 }

 CloseImg(){
   this.imageSrc=null;
   this.service.editData.Attachment=null;
 }

  UrlId:String;
  userid:String=localStorage.getItem('UserId');
  Name:any=localStorage.getItem('Name');
  error:String="hasError";

  PrivacyList:String[]=[
    'Friends',
    'Only Me'
  ];

 

  ngOnInit(): void {
    
    // this.router.events.subscribe((val) => {
      // see also 
      // console.log(val instanceof NavigationEnd ) 
  //     if(val instanceof NavigationEnd){
  //       this.ngOnInit();
  //     }
  // });
    this.service.getCLikes();
    console.log(this.service.cLikeList);

    this.UrlId = this.activatedRoute.snapshot.paramMap.get('id');
    this.service.getPostsById(this.UrlId);
    this.service.getCommentsByPostsId(this.UrlId);
    this.service.getLikes();
    console.log(this.service.comments);

    console.log(this.UrlId)
    if(this.userid != null){
      this.error="";
    }

    this.service.getAllNotification(this.userid);
      localStorage.setItem('notificationCount',this.service.notificationList.length.toString())
  }



  LikeClicked(Id:String){
    this.service.formData.Likes=1;
    this.service.formData.PostId=Id;
    

    this.service.notification.IsComment=0;
    this.service.NotificationInsert(this.service.formData.UserId).subscribe(
      res=>{

      },
      err=>{
        console.log(err);
      }
    )
    this.service.LikesInsert().subscribe(
        res=>{
          this.service.getLikes();
        },
        err=>{
          console.log(err);
        }
      )
  }
 

  CommentSubmit(form:NgForm){

    this.service.notification.IsComment=1;
    this.service.NotificationInsert(this.service.formData.UserId).subscribe(
      res=>{

      },
      err=>{
        console.log(err);
      }
    )


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
cl:number=0;
checker:boolean=false;
cchecker:boolean=false;

count(){
  this.c+=1;
  this.checker=true;
}

ccount(){
  this.cl+=1;
}
reset(){
  this.c=0;
  
}
creset(){
  
  this.cl=0;
}
ckreset(){
  this.chk=false;
}

txt:String;
ctxt:String;
chk:boolean=false;
liked(){
  this.txt="Liked";
  this.chk=true;
}
unliked(){
  this.txt="";
  
}
cunliked(){
  this.ctxt="";
}
cliked(){
  this.ctxt="Liked";
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
 
commentLiked(Id:String){
  console.log(Id);
  this.service.commentLike.Likes=1;
  this.service.commentLike.CommentId=Id;
  

  // this.service.notification.IsComment=0;
  // this.service.NotificationInsert(this.service.formData.UserId).subscribe(
  //   res=>{

  //   },
  //   err=>{
  //     console.log(err);
  //   }
  // )
  this.service.commentLike.UserId=this.userid;
  this.service.CLikesInsert().subscribe(
      res=>{
        this.service.getCLikes();
        console.log(this.service.cLikeList);
      },
      err=>{
        console.log(err);
      }
    )
}

getLikersByPostId(Id:String){
  console.log("Okk"+Id);
  this.service.getLikesByPostId(Id);
}

getcommentorsByPostId(Id:String){
  console.log("Okk"+Id);
  this.service.getCommentsByPostsId(Id);
}
commentDelete(Id:String){
  this.service.comment.C_IsDeleted=true;
  this.service.DeleteComment(Id).subscribe(
    res=>{
      this.ngOnInit();
      console.log(res);
    
    },
    err=>{
      console.log(err);
    }
  )
}
}
