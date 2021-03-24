import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../shared/profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(public service:ProfileService) { }

  ngOnInit(): void {
  }

}
