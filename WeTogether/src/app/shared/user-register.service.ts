import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseURLService } from './base-url.service';
import { UserRegister } from './user-register.model';

@Injectable({
  providedIn: 'root'
})
export class UserRegisterService {

  constructor(private http:HttpClient,public baseurl:BaseURLService) { }
  formData:UserRegister=new UserRegister();

  // readonly baseURL = 'http://wetogether.local/api/Account/Register';
  readonly baseURL = this.baseurl.baseUrl+'/api/Account/Register';

  
  postRegister(){
    console.log(this.formData);
    return this.http.post(this.baseURL,this.formData);
  }
}
