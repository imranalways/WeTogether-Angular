import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FRequest } from './frequest.model';
import { Posts } from './posts.model';
import { Profile } from './profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient) { }
  formData:Profile=new Profile();
  list:Profile;
  usersPosts:Posts[];
  postData:Posts=new Posts();

  frequest:FRequest=new FRequest();
  freqList:FRequest[];
  
  // readonly baseURL= 'http://wetogether.local/api/Profile/';
  readonly baseURL= 'https://localhost:44388/api/Profile/';


  

  submitPost(){
    if(this.postData.PostPrivacy==""){
      this.postData.PostPrivacy="Public";
    }
    this.postData.PostBy=localStorage.getItem('Name');
    this.postData.UserId=localStorage.getItem('UserId')
    console.log(this.postData);
    return this.http.post('https://localhost:44388/api/Posts/Submit',this.postData);
    
  }
  getPostsByUserId(id:String){
    return this.http.get('https://localhost:44388/api/Posts/GetbyUser/'+id)
    .toPromise()
    .then(res=>this.usersPosts=res as Posts[]);
  }

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
  sendFriendRequest(){
    return this.http.post(this.baseURL+"Request/Submit",this.frequest);
  }

  FRequestGetByReceiverId(){
    return this.http.get(this.baseURL+"GetFRequestByReceiver")
    .toPromise()
    .then(res=>this.freqList=res as FRequest[]);
  }
}
