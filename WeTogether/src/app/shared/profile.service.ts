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
  readonly baseURL= 'https://localhost:44388/api/Account/';

  getUserById(){
    this.formData.UserId="User_Imran Hossain_20210321021936";
    return this.http.get(this.baseURL+"GetById/"+this.formData.UserId)
    .toPromise()
    .then(res=>this.list=res as Profile);
  }

}
