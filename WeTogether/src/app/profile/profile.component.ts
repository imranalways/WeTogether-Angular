import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../shared/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public service:ProfileService) { }
  hdn:String="Yeshidden";
  ngOnInit(): void {
    console.log(this.service.getUserById());
    console.log(this.service.list)
  }
  EditBio(){
    if(this.hdn=="NotHidden"){
      this.hdn="YesHidden";
    }
    else{
      this.hdn="NotHidden";
    }
    
    console.log(this.hdn);
  }
}
