import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from './profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient) { }
  formData:Profile=new Profile();
  list:Profile;
  readonly baseURL= 'https://localhost:44388/api/Profile/';

  

  getUserById(){

    return this.http.get(this.baseURL+"Get_UserBasic_Info/"+this.formData.UserId)
    .toPromise()
    .then(res=>this.formData=res as Profile);
  }


  GeneralInfoSubmit(){
    
    console.log(this.formData);
    return this.http.post(this.baseURL+"General_Info_Save/",this.formData);
  }

  EducationalInfoSubmit(){
   
    console.log(this.formData);
    return this.http.post(this.baseURL+"Educational_Info_Save/",this.formData);
  }

  AddressInfoSubmit(){
   
    console.log(this.formData);
    return this.http.post(this.baseURL+"Address_Info_Save/",this.formData);
  }
  
}
