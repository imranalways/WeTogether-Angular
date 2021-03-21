import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserRegisterService } from '../shared/user-register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public service:UserRegisterService) { }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm){
    this.service.postRegister().subscribe(
      res=>{

      },
      err=>{
        console.log(err);
      }
    )
  }
}
