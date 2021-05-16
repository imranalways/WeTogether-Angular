import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseURLService } from './base-url.service';
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
  postLikes:LikeDetails[];
  likeInsert:LikeDetails=new LikeDetails();

  editData:Posts=new Posts();
  imgData:Posts;
  notification:Notification=new Notification();
  notificationList:Notification[];

  commentLike:CommentLike=new CommentLike();
  cLikeList:CommentLike[];

  constructor(private http:HttpClient,public baseurl:BaseURLService) { }
  // readonly baseURL= 'http://wetogether.local/api/Posts/';
  readonly baseURL= this.baseurl.baseUrl+'/api/Posts/';


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
    return this.http.get(this.baseurl.baseUrl+'/api/Comment/GetById/'+id)
    .toPromise()
    .then(res=>this.comments=res as PostDetails[]);
  }
  getAllComments(){
    return this.http.get(this.baseurl.baseUrl+'/api/Comment/GetAll')
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
      return this.http.post(this.baseurl.baseUrl+"/api/Comment/Submit",this.comment);
    }
  }

  LikesInsert(){
    this.likeInsert.LikedBy=localStorage.getItem('Name');
    this.likeInsert.PostId=localStorage.getItem('PostId');
    this.likeInsert.UserId=localStorage.getItem("UserId");
    return this.http.post(this.baseURL+"Likes_Insert",this.likeInsert);
  }
  CLikesInsert(){
    return this.http.post(this.baseURL+"CLikes_Insert",this.commentLike);
  }
  getLikes(){
    return this.http.get(this.baseURL+"Likes")
    .toPromise()
    .then(res=>this.likes=res as LikeDetails[]);
  }

  getLikesByPostId(Id:String){
    return this.http.get(this.baseURL+"Likes/"+Id)
    .toPromise()
    .then(res=>this.postLikes=res as LikeDetails[]);
  }

  getCLikes(){
    return this.http.get(this.baseURL+"CLikes")
    .toPromise()
    .then(res=>this.cLikeList=res as CommentLike[]);
  }
  NotificationInsert(Uid:String){
    this.notification.PostId=localStorage.getItem('PostId');
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
  DeleteComment(Id:String){
    this.comment.CommentId=Id;
    return this.http.post(this.baseurl.baseUrl+"/api/Comment/Delete",this.comment);
  }
}
