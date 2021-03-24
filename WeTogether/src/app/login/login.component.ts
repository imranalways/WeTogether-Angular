import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../shared/login.model';
import { LoginService } from '../shared/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public service:LoginService,public router:Router) { }
  error:String;
  ngOnInit(): void {
  }
  onSubmit(form:NgForm){
    this.service.Verify_Login().subscribe(
      res=>{
        this.error="";
        localStorage.setItem('Email', this.service.formData.Email);
        this.router.navigate(['/Posts']);
      },
      err=>{
        this.error="Email/Password is Invalid";
        console.log(err.status);
      }
    )
  }
}
