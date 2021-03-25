import { Component, OnInit } from '@angular/core';
import { PostsService } from '../shared/posts.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  constructor(public service:PostsService) {
    
   }

   
  txt:String;

  PrivacyList:String[]=[
    'Friends',
    'Only Me'
  ];
  Name:any=localStorage.getItem('Name');
  ngOnInit(): void {
    if(this.service.formData.PostPrivacy==""){
      this.service.formData.PostPrivacy='Public';
    }
    
    console.log(this.PrivacyList);
    console.log(this.service.getAllPosts());
  }


  // getPostById(post:Posts){
  //     console.log( post.PostId);
  // }
  clickEvent(){
    if(this.txt=="Clicked"){
      this.txt="NotClicked";
    }
    else{
      this.txt="Clicked";
    }
  }
 
  
 
  onSubmit(form:NgForm){
    this.service.submitPost().subscribe(
      res=>{
        this.ngOnInit();
        this.service.formData.PostBody="";
      },
      err=>{
        console.log(err);
      }
    )
  }
}
