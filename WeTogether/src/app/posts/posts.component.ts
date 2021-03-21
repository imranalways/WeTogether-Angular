import { Component, OnInit } from '@angular/core';
import { Posts } from '../shared/posts.model';
import { PostsService } from '../shared/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  constructor(public service:PostsService) { }

  ngOnInit(): void {
    
    console.log(this.service.getAllPosts());
  }
  
  getPostById(post:Posts){
      console.log( post.PostId);
  }
}
