import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../shared/profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(public service:ProfileService,private activatedRoute: ActivatedRoute) { 
    this.service.getUserById();
   
  }

  userid:String=localStorage.getItem('UserId');

  // UrlId:String;
  error:String="hasError";
  ngOnInit(): void {
    // this.UrlId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.userid);
    if(this.userid != null){
      this.error="";
      this.service.formData.UserId=this.userid;
      this.service.getUserById();
      console.log(this.service.formData);
    }
     

  }

 
  hdnG:String="hidden";
  messageG:String="";
  GeneralInfoSubmit(form:NgForm){
    this.service.GeneralInfoSubmit().subscribe(
      res=>{
        console.log(res);
        this.hdnG="message";
        this.messageG="Data Saved Successfully";
        setTimeout(()=> {
          this.hdnG="hidden";
          this.messageG=""; },4000); 
      },
      err=>{
        this.hdnG="Errmessage";
        this.messageG="Error! While Saving Data: "+err;
        console.log(err);
        setTimeout(()=> {
          this.hdnG="hidden";
          this.messageG=""; },4000);
      }
    )
  }
  hdnE:String="hidden";
  messageE:String="";
  EducationalInfoSubmit(form:NgForm){
    this.service.EducationalInfoSubmit().subscribe(
      res=>{
        console.log(res);
        this.hdnE="message";
        this.messageE="Data Saved Successfully";
        setTimeout(()=> {
          this.hdnE="hidden";
          this.messageE=""; },4000); 
      },
      err=>{
        console.log(err);
        this.hdnE="Errmessage";
        this.messageE="Error! While Saving Data: "+err;
        setTimeout(()=> {
          this.hdnE="hidden";
          this.messageE=""; },4000);
      
      }
    )
  }
  hdnA:String="hidden";
  messageA:String="";
  AddressInfoSubmit(form:NgForm){
    this.service.AddressInfoSubmit().subscribe(
      res=>{
        console.log(res);
        this.hdnA="message";
        this.messageA="Data Saved Successfully";
        setTimeout(()=> {
          this.hdnA="hidden";
          this.messageA=""; },4000); 
      },
      err=>{
        console.log(err);
        this.hdnA="Errmessage";
        this.messageA="Error! While Saving Data";
        setTimeout(()=> {
          this.hdnA="hidden";
          this.messageA=""; },4000); 
      }
    )
  }
  
}
