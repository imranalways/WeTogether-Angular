import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LikeDetails } from './like-details.model';
import { PostDetails } from './post-details.model';
import { Posts } from './posts.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  formData:Posts=new Posts();
  list:Posts[];
  comment:PostDetails=new PostDetails;
  comments:PostDetails[];
  commentList:PostDetails[];
  likes:LikeDetails[];

  constructor(private http:HttpClient) { }
  readonly baseURL= 'https://localhost:44388/api/Posts/';

  getPostsById(id:String){
    return this.http.get(this.baseURL+id)
    .toPromise()
    .then(res=>this.formData=res as Posts);
  }

  getCommentsByPostsId(id:String){
    return this.http.get('https://localhost:44388/api/Comment/GetById/'+id)
    .toPromise()
    .then(res=>this.comments=res as PostDetails[]);
  }
  getAllComments(){
    return this.http.get('https://localhost:44388/api/Comment/GetAll')
    .toPromise()
    .then(res=>this.commentList=res as PostDetails[]);
  }

  getAllPosts(){
    return this.http.get(this.baseURL+"GetAll")
    .toPromise()
    .then(res=>this.list=res as Posts[]);
  }

  submitPost(){
    if(this.formData.PostPrivacy==""){
      this.formData.PostPrivacy="Public";
    }
    this.formData.PostBy=localStorage.getItem('Name');
    this.formData.UserId=localStorage.getItem('UserId')
    console.log(this.formData);
    if(this.formData.PostBody!=""){
      return this.http.post(this.baseURL+"Submit",this.formData);
    }
  }

  CommentSubmit(){
    if(this.comment.CommentBody!=""){
      this.comment.PostId=this.formData.PostId;
      this.comment.C_UserId=localStorage.getItem('UserId');
      this.comment.CommentBy=localStorage.getItem('Name')
      return this.http.post("https://localhost:44388/api/Comment/Submit",this.comment);
    }
  }

  LikesInsert(){
    console.log("Like clickeed");
    return this.http.post(this.baseURL+"Likes_Insert",this.formData);
  }
   
  getLikes(){
    return this.http.get(this.baseURL+"Likes")
    .toPromise()
    .then(res=>this.likes=res as LikeDetails[]);
  }

  sec:number;
  minutes:number;
  hours:number;
  day:number;
  date:Date;
  dateToday: number = Date.now();
  agoTime:String="";

  getAgoTime(postdate:number){
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
