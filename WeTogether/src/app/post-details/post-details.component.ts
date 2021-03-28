import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../shared/posts.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  constructor(public service:PostsService,private activatedRoute: ActivatedRoute) { }
  
  UrlId:String;
  ngOnInit(): void {
    this.UrlId = this.activatedRoute.snapshot.paramMap.get('id');
    this.service.getPostsById(this.UrlId);
    this.service.getCommentsByPostsId(this.UrlId);
    console.log(this.service.comments);
  }

  checkId(Id:String){
    console.log(Id);
  }

  optionClicked(){
    console.log("Okk");
  }

  CommentSubmit(form:NgForm){
    this.service.CommentSubmit().subscribe(
      res=>{
         form.form.reset();
         this.ngOnInit();
      },
      err=>{
        console.log(err);
      }
    )
  }

}
