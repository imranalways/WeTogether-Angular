import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseURLService } from './base-url.service';
import { Login } from './login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient,public baseurl:BaseURLService) { }
  formData:Login=new Login();
  // readonly baseURL = 'http://wetogether.local/api/Account/Login';
  readonly baseURL = 'https://localhost:44388/api/Account/Login';

  Verify_Login(){
    console.log(this.formData);
    return this.http.post(this.baseURL,this.formData);
    
  }

}
