import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostDetails } from './post-details.model';
import { Posts } from './posts.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  formData:Posts=new Posts();
  list:Posts[];
  comments:PostDetails[];

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
}
