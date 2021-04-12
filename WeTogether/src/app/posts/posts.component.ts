import { Component, Injectable, OnInit } from '@angular/core';
import { PostsService } from '../shared/posts.service';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  constructor(public service:PostsService) {
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


  PrivacyList:String[]=[
    'Friends',
    'Only Me'
  ];

  Name:any=localStorage.getItem('Name');
  userid:String=localStorage.getItem('UserId');
  error:String="hasError";

  ngOnInit(): void {
    this.service.editData.Attachment=null;
      if(this.userid != null){
        this.error="";
      }

      if(this.service.formData.PostPrivacy==""){
        this.service.formData.PostPrivacy='Public';
      }

      this.service.formData.PostBody="";
      this.service.formData.PostId="";
      console.log(this.PrivacyList);
      this.service.getAllNotification(this.userid);
      console.log(this.service.getAllPosts());

      this.service.getLikes();
      console.log(this.service.getAllComments());

      console.log(this.service.list);
      if(this.service.list==undefined){
        this.checker=true;
      }
      console.log(this.service.likes);

      
      localStorage.setItem('notificationCount',this.service.notificationList.length.toString())

  }



 
  LikeClicked(Id:String,Uid:String){

    this.service.formData.Likes=1;
    this.service.formData.PostId=Id;
    this.service.formData.UserId=this.userid;

    this.service.notification.IsComment=0;
    this.service.NotificationInsert(Uid).subscribe(
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

  onSubmit(){
    this.service.formData.Attachment=this.imageSrc;
    this.service.submitPost().subscribe(
      res=>{
        this.ngOnInit();
        console.log(res);
        this.service.formData.PostBody="";
        this.service.formData.PostId="";
        this.service.editData.Attachment=null;
        
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

  getPostById(id:String){
    this.service.getPostsByIdToEdit(id);
  }
  updatePost(){
    this.service.updatePost().subscribe(
      res=>{
        this.ngOnInit();
        console.log(res);
        this.service.editData.PostBody="";
        this.service.editData.Attachment=null;
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
        this.ngOnInit();
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
