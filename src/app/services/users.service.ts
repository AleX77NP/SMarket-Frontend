import { Router } from '@angular/router';
import { OrderItem } from './../models/order-item';
import { Order } from './../models/order';
import { contactURL} from './../config/api';
import { UserMessage } from './../models/user-message';
import { Customer } from './../models/customer';
import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import {catchError,tap} from 'rxjs/operators'
import {MessagerService} from 'src/app/services/message.service'
import { User } from '../models/user';
import {signupURL, loginURL} from 'src/app/config/api'
import {makeOrderURL, orderItemURL, orderInfoURL, myProfileURL, myOrdersURL, updateMeURL, resetURL, resetCURL} from 'src/app/config/api'
//import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  myUser = null;
  auth:boolean = false;
  admin:number = 0;
  isAdmin:boolean=false;
  myAdmin: string = null;
  adminCode = 0;
  defaultCode = 818352;

  constructor(private http: HttpClient, private msg: MessagerService, protected router: Router) { }

register(user: User):Observable<User>{
  return this.http.post<User>(signupURL,JSON.stringify(user)).pipe(
    tap(_=> this.log('signed up!')),
      catchError(this.handleError))
}

login(customer: Customer):Observable<any> {
   return this.http.post<Customer>(loginURL,JSON.stringify(customer)).pipe(
    tap(_=> this.log('login success!')),
      catchError(this.handleError))
}

contactSeller(message: UserMessage) {
   return this.http.post<UserMessage>(contactURL,JSON.stringify(message)).pipe(
    tap(_=> this.log('contact success!')),
    catchError(this.handleError)
   )
}

makeOrder(order: Order) : Observable<Order> {
  return this.http.post<Order>(makeOrderURL, JSON.stringify(order)).pipe(
    tap(_=> this.log('order success!')),
    catchError(this.handleError)
  )
}

makeOrderItem(oitem: OrderItem) {
  return this.http.post<OrderItem>(orderItemURL, JSON.stringify(oitem)).pipe(
    tap(_=> this.log('order item success!')),
    catchError(this.handleError)
  )
}

getOrderInfo(id: number, email: string) {
   return this.http.get(`${orderInfoURL}?id=${id}&email=${email}`).pipe(
    tap(_=> this.log('mail success!')),
    catchError(this.handleError)
   )
}

getMe(email: string) :Observable<User>{
    return this.http.get<any>(`${myProfileURL}?email=${email}`).pipe(
      tap(_=> this.log('me success!')),
      catchError(this.handleErrorLR)
    )
}

getMyOrders(email: string) :Observable<any>{
  return this.http.get(`${myOrdersURL}?email=${email}`).pipe(
    tap(_=> this.log('my orders success!')),
    catchError(this.handleErrorLR)
  )
}

editMe(data) {
  return this.http.post(updateMeURL, JSON.stringify(data)).pipe(
    tap(_=> this.log('my update success!')),
    catchError(this.handleError)
  )
}

tryReset(email: string) {
  return this.http.get(`${resetURL}?email=${email}`).pipe(
    tap(_=> this.log('try reset success!')),
    catchError(this.handleError)
  )
}

changePassword(data) {
  return this.http.post(resetCURL,JSON.stringify(data)).pipe(
    tap(_=> this.log('change request success!')),
    catchError(this.handleError)
  )
}

private log(message: string) {
  this.msg.add(`User service: ${message}`);
}

 handleError(error: HttpErrorResponse) {
 console.log("Error! Somtehing went wrong.",error);
 alert(JSON.stringify(error.error))
 return throwError("Something went wrong");
}

handleErrorLR() {
  console.log("Error! Somtehing went wrong. User does not exits");
  alert(JSON.stringify("Korisnik ne postoji"));
  try {
    sessionStorage.removeItem('user');
  }
  catch(e) {
    console.log(e);
  }
  return throwError("Something went wrong");
}


checkAuth() {
  try{
  let token = sessionStorage.getItem('user');
 // this.myUser = CryptoJS.AES.decrypt(token,'2608981412').toString(CryptoJS.enc.Utf8);
 this.myUser = token;
  }
  catch(e) {
    this.myUser = null;
  }
  if(this.myUser!==null) {
    this.auth = true;
  }
  else {
    this.auth=false;
  }
  return this.auth;
}

checkAdmin() {
  try{
  let token = sessionStorage.getItem('user');
  this.adminCode = JSON.parse(sessionStorage.getItem('codeA'));
 // this.myAdmin = CryptoJS.AES.decrypt(token,'2608981412').toString(CryptoJS.enc.Utf8);
 this.myAdmin = token;
  }
  catch(e) {
    this.myAdmin = null;
  }
  // todo GetAdmins metoda PHP da lista sve admine //
  if(this.adminCode == this.defaultCode) {
  this.isAdmin=true;
  }
  else{
  this.isAdmin=false;
  }
  return this.isAdmin;
}

logout() {
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('codeA');
}

currentUser() {
  let token = sessionStorage.getItem('user');
  //let me = CryptoJS.AES.decrypt(token,'2608981412').toString(CryptoJS.enc.Utf8);
  return token;
}

}
