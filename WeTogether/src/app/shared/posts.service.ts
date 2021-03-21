import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Posts } from './posts.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  list:Posts[];
  constructor(private http:HttpClient) { }
  readonly baseURL= 'https://localhost:44388/api/Posts/GetAll';

  getAllPosts(){
    return this.http.get(this.baseURL)
    .toPromise()
    .then(res=>this.list=res as Posts[]);
  }
}
