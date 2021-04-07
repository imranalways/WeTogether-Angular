import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegister } from './user-register.model';

@Injectable({
  providedIn: 'root'
})
export class UserRegisterService {

  constructor(private http:HttpClient) { }
  formData:UserRegister=new UserRegister();

  readonly baseURL = 'http://wetogether.local/api/Account/Register';
  postRegister(){
    console.log(this.formData);
    return this.http.post(this.baseURL,this.formData);
  }
}
