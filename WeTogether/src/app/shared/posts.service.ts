import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentLike } from './comment-like.model';
import { LikeDetails } from './like-details.model';
import { Notification } from './notification.model';
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
  editData:Posts=new Posts();
  imgData:Posts;
  notification:Notification=new Notification();
  notificationList:Notification[];

  commentLike:CommentLike=new CommentLike();
  cLikeList:CommentLike[];

  constructor(private http:HttpClient) { }
  // readonly baseURL= 'http://wetogether.local/api/Posts/';
  readonly baseURL= 'https://localhost:44388/api/Posts/';


  getPostsById(id:String){
    if(id!=null){
      return this.http.get(this.baseURL+id)
      .toPromise()
      .then(res=>this.formData=res as Posts);
    }
  }
  getPostsByIdToEdit(id:String){
    return this.http.get(this.baseURL+id)
    .toPromise()
    .then(res=>this.editData=res as Posts);
  }

  getImage(id:String){
    return this.http.get(this.baseURL+id)
    .toPromise()
    .then(res=>this.imgData=res as Posts);
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
    return this.http.post(this.baseURL+"Submit",this.formData);
    
  }

  updatePost(){
    if(this.editData.PostPrivacy==""){
      this.editData.PostPrivacy="Public";
    }
    this.editData.PostBy=localStorage.getItem('Name');
    this.editData.UserId=localStorage.getItem('UserId')
    console.log(this.editData);
    // if(this.editData.PostBody!="" || this.editData.Attachment!=null || this.editData.Attachment!=""){
    // console.log(this.editData.PostBody);
    // console.log(this.editData.Attachment)
    return this.http.post(this.baseURL+"Submit",this.editData);
    // }
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
    
    return this.http.post(this.baseURL+"Likes_Insert",this.formData);
  }
  CLikesInsert(){
    return this.http.post(this.baseURL+"CLikes_Insert",this.commentLike);
  }
  getLikes(){
    return this.http.get(this.baseURL+"Likes")
    .toPromise()
    .then(res=>this.likes=res as LikeDetails[]);
  }
  getCLikes(){
    return this.http.get(this.baseURL+"CLikes")
    .toPromise()
    .then(res=>this.cLikeList=res as CommentLike[]);
  }
  NotificationInsert(Uid:String){
    this.notification.PostId=this.formData.PostId;
    this.notification.UserId=Uid;
    this.notification.L_UserId=localStorage.getItem('UserId');
    this.notification.LikedBy=localStorage.getItem('Name');
    return this.http.post(this.baseURL+"Notification_Insert",this.notification);
  }

  getAllNotification(userid:String){
    return this.http.get(this.baseURL+"Notification/GetAll/"+userid)
    .toPromise()
    .then(res=>this.notificationList=res as Notification[]);
  }

}
