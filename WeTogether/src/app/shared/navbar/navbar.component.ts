import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostsComponent } from '../../posts/posts.component';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( public router:Router,public component:PostsComponent) { }

  userid:any=localStorage.getItem('UserId');
  error:String="hasError";
  
  ngOnInit(): void {
    if(this.userid != null){
      this.error="";
    }
  }
  refresh(){
    this.component.ngOnInit();
  }
}
