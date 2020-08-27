import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class MessagerService {

  subject =  new Subject()
  messages: string[] = [];

  constructor() { }

  sendMessage(product) {
    console.log(product)
  this.subject.next(product) //Trigger dogadjaja
  }

  add(message: string) {
    this.messages.push(message);
    console.log(message);
  }

  getMessage() {
    return this.subject.asObservable()
  }
}
