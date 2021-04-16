import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../shared/posts.service';
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

  constructor(public service:ProfileService,public postService:PostsService, private activatedRoute: ActivatedRoute) { 
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
       this.service.postData.Attachment=this.imageSrc;
       this.postService.editData.Attachment=this.imageSrc; 
     };
  
   }
 }

 CloseImg(){
   this.imageSrc=null;
   this.service.postData.Attachment=null;
   this.postService.editData.Attachment=null;

 }


 PrivacyList:String[]=[
   'Friends',
   'Only Me'
 ];


  userid:any=localStorage.getItem('UserId');
  UrlId:String;
  error:String="hasError";
  Name:any=localStorage.getItem('Name');


  ngOnInit(): void {
    this.service.FRequestGetByReceiverId();

    if(this.userid != null){
      this.error="";
    }
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

    if(this.service.postData.PostPrivacy==""){
      this.service.postData.PostPrivacy='Public';
    }

    this.service.getPostsByUserId(this.UrlId);

    this.postService.getLikes();
    console.log(this.postService.getAllComments());

    if(this.service.usersPosts==undefined){
      this.checker=true;
    }

    this.postService.getAllNotification(this.userid);
    localStorage.setItem('notificationCount',this.postService.notificationList.length.toString());


  }
  onSubmit(){
    this.service.submitPost().subscribe(
      res=>{
        this.ngOnInit();
        console.log(res);
        this.service.postData.PostBody="";
        this.service.postData.PostId="";
        this.service.postData.Attachment=null;
       this.postService.editData.Attachment=null; 
       
        
      },
      err=>{
        console.log(err);
      }
    )
  }
  LikeClicked(Id:String){
    this.postService.formData.Likes=1;
    this.postService.formData.PostId=Id;
    this.postService.formData.UserId=this.userid;
    this.postService.LikesInsert().subscribe(
        res=>{
          this.postService.getLikes();
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
    this.postService.getPostsByIdToEdit(id);
  }
  updatePost(){
    this.postService.updatePost().subscribe(
      res=>{
        this.ngOnInit();
        console.log(res);
        this.postService.editData.PostBody="";
        this.postService.editData.Attachment=null;
      },
      err=>{
        console.log(err);
      }
    )
  }
  deletePost(){
    this.postService.editData.IsDeleted=true;
    this.postService.updatePost().subscribe(
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


  getLikersByPostId(Id:String){
    console.log("Okk"+Id);
    this.postService.getLikesByPostId(Id);
  }

  getcommentorsByPostId(Id:String){
    console.log("Okk"+Id);
    this.postService.getCommentsByPostsId(Id);
  }

  sendFriendRequest(Id:String,Rname:String){
    this.service.frequest.SenderId=this.userid;
    this.service.frequest.ReceiverId=Id;
    this.service.frequest.SenderName=this.Name;
    this.service.frequest.ReceiverName=Rname;
    this.service.frequest.IsAccepted=false;
    this.service.sendFriendRequest().subscribe(
      res=>{
        console.log(res);
        this.ngOnInit();
      },
      err=>{
        console.log(err);
      }
    )
  }

  acceptFriendRequest(Id:String,Rname:String,Requestid:String){
    this.service.frequest.RequestId=Requestid;
    this.service.frequest.ReceiverId=this.userid;
    this.service.frequest.SenderId=Id;
    this.service.frequest.ReceiverName=this.Name;
    this.service.frequest.SenderName=Rname;
    this.service.frequest.IsAccepted=true;
    this.service.acceptFriendRequest().subscribe(
      res=>{
        console.log(res);
        this.ngOnInit();
      },
      err=>{
        console.log(err);
      }
    )
  }

  hasReceiverId:boolean=false;
  hasReceiver(){
    this.hasReceiverId=true;
  }

  hasReceiverReset(){
    this.hasReceiverId=false;
  }
}
