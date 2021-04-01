import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostsComponent } from 'src/app/posts/posts.component';
import { ProfileComponent } from 'src/app/profile/profile.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public pro:ProfileComponent, public router:Router,public component:PostsComponent) { }

  ngOnInit(): void {
  }
  userid:any=localStorage.getItem('UserId');
  refresh(){
    this.component.ngOnInit();
  }
}
