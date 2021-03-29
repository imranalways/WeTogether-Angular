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
  userid:String=localStorage.getItem('UserId');
  error:String="hasError";
  ngOnInit(): void {
    if(this.userid != null){
      this.error="";
    }
    if(this.service.formData.PostPrivacy==""){
      this.service.formData.PostPrivacy='Public';
    }
    this.service.formData.PostBody="";
    console.log(this.PrivacyList);
    console.log(this.service.getAllPosts());
    this.service.getLikes();
    console.log(this.service.likes);
  }



  clickEvent(){
    if(this.txt=="Clicked"){
      this.txt="NotClicked";
    }
    else{
      this.txt="Clicked";
    }
  }
 
  LikeClicked(Id:String){
    this.service.formData.Likes=1;
    this.service.formData.PostId=Id;
    this.service.formData.UserId=this.userid;
    this.service.LikesInsert().subscribe(
        res=>{
         
        },
        err=>{
          console.log(err);
        }
      )
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

  optionClicked(){
    console.log("Okk");
  }


c:number=0;
  count(id:String){
    this.c+=1;
    console.log(this.c);
    console.log(id);
  }
  reset(){
    this.c=0;
  }
}
