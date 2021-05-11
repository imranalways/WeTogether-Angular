import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseURLService {

  constructor() { }

  // readonly baseUrl = 'http://10.100.14.204:8091';
  readonly baseUrl = 'https://localhost:44388';
}
