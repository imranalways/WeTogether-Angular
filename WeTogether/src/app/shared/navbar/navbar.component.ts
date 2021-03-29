import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileComponent } from 'src/app/profile/profile.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public pro:ProfileComponent, public router:Router) { }

  ngOnInit(): void {
  }
  userid:any=localStorage.getItem('UserId');
  
}
