import { Component, OnInit } from '@angular/core';
import { UserRegister } from '../shared/user-register.model';
import { UserRegisterService } from '../shared/user-register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public service:UserRegisterService) { }

  ngOnInit(): void {
  }

}
