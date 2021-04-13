import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegisterService } from '../shared/user-register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public service:UserRegisterService,public router:Router) { }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm){
    this.service.postRegister().subscribe(
      res=>{
        this.router.navigate(['']);
      },
      err=>{
        console.log(err);
      }
    )
  }
}
