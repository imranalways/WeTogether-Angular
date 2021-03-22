import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Posts } from './posts.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  formData:Posts=new Posts();
  list:Posts[];
  constructor(private http:HttpClient) { }
  readonly baseURL= 'https://localhost:44388/api/Posts/';

  getAllPosts(){
    return this.http.get(this.baseURL+"GetAll")
    .toPromise()
    .then(res=>this.list=res as Posts[]);
  }

  submitPost(){
    if(this.formData.PostPrivacy==""){
      this.formData.PostPrivacy="Public";
    }
    this.formData.PostBy="Hossain";
    console.log(this.formData);
    if(this.formData.PostBody!=""){
      return this.http.post(this.baseURL+"Submit",this.formData);
    }
    
  }
}
