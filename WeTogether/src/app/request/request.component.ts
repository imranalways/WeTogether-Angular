import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../shared/profile.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  constructor(public service:ProfileService) { }
  userid:any=localStorage.getItem('UserId');
  Name:any=localStorage.getItem('Name');
  ngOnInit(): void {
    this.service.FRequestGetByReceiverId();
    console.log(this.service.freqList);
  }

  acceptFriendRequest(Id:String,Rname:String,Requestid:String){
    this.service.frequest.RequestId=Requestid;
    this.service.frequest.ReceiverId=this.userid;
    this.service.frequest.SenderId=Id;
    this.service.frequest.ReceiverName=this.Name;
    this.service.frequest.SenderName=Rname;
    this.service.frequest.IsAccepted=true;
    this.service.acceptFriendRequest().subscribe(
      res=>{
        console.log(res);
        this.ngOnInit();
      },
      err=>{
        console.log(err);
      }
    )
  }

  rejectFriendRequest(Id:String,Rname:String,Requestid:String){
    this.service.frequest.RequestId=Requestid;
    this.service.frequest.ReceiverId=this.userid;
    this.service.frequest.SenderId=Id;
    this.service.frequest.ReceiverName=this.Name;
    this.service.frequest.SenderName=Rname;
    this.service.frequest.IsAccepted=false;

    this.service.acceptFriendRequest().subscribe(
      res=>{
        console.log(res);
        this.ngOnInit();
      },
      err=>{
        console.log(err);
      }
    )
  }

}
