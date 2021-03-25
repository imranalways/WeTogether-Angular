import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProfileService } from '../shared/profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(public service:ProfileService) { 
    this.service.getUserById();
   
  }
 
  ngOnInit(): void {
    this.service.getUserById();
    console.log(this.service.formData);
    
    
  }
  hdn:String="hidden";
  message:String="";
  GeneralInfoSubmit(form:NgForm){
    this.service.GeneralInfoSubmit().subscribe(
      res=>{
        console.log(res);
        this.hdn="";
        this.message="Data Saved Successfully";
      },
      err=>{
        this.hdn="";
        this.message="Error! While Saving Data: "+err;
        console.log(err);
      }
    )
  }

  EducationalInfoSubmit(form:NgForm){
    this.service.EducationalInfoSubmit().subscribe(
      res=>{
        console.log(res);
      },
      err=>{
        console.log(err);
      }
    )
  }

  AddressInfoSubmit(form:NgForm){
    this.service.AddressInfoSubmit().subscribe(
      res=>{
        console.log(res);
      },
      err=>{
        console.log(err);
      }
    )
  }
  
}
