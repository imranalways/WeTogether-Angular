import { Injectable } from '@angular/core';
import { UserRegister } from './user-register.model';

@Injectable({
  providedIn: 'root'
})
export class UserRegisterService {

  constructor() { }
  formData:UserRegister=new UserRegister();
}
