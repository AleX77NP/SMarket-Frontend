import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from './../services/users.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
//import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  numOfOrders = 5;
  myForm: FormGroup;
  hiddens = [];
  user: User = null;
  orders = [];
  sortedOrders = [];
  myLoad = false;
  mySub = false;
  allOrders: Array<any>[] = [];

  constructor(private userService: UsersService, protected router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    if(!this.userService.checkAuth()) {
      this.router.navigate(['/']);
    }
    this.initForm();
    this.getMe();
    this.getMyOrders();
  }

  logoutMe() {
    this.userService.logout();
    this.router.navigate(['/']);
  }

  getMe() {
    let token = sessionStorage.getItem('user');
   // let me = CryptoJS.AES.decrypt(token,'2608981412').toString(CryptoJS.enc.Utf8);
    this.userService.getMe(token).subscribe(user => {console.log(JSON.stringify(user)); 
       this.user = user;
    this.setValues(user.email,user.name,user.surname,user.address,user.phoneNum);
    },err => {
      console.log(err);
      this.router.navigate(['/']);
    })
  }

  getMyOrders() {
    let token = sessionStorage.getItem('user');
    //let me = CryptoJS.AES.decrypt(token,'2608981412').toString(CryptoJS.enc.Utf8);
    this.userService.getMyOrders(token).subscribe(res => {
      console.log(res); this.orders=res
      if(res!==null) {
         var results = this.orders.reduce(function(results, order){
           (results[order.idOrder]= results[order.idOrder] || []).push(order);
           return results;
         },{})
        this.sortedOrders = results;
        this.orders.forEach(o => {
          this.hiddens.push({hidden: true, order: o.idOrder, total: o.totalPrice,dateT: o.dateOrder})
        })
        console.log(results);
      }
    });
  }

  initForm() {
    this.myForm = this.fb.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      address: ['', Validators.required],
      phoneNum: ['', Validators.required]
    })
  }

  setValues(e: string, n:string, s: string, a:string, p:string) {
    this.myForm.patchValue({
       email:e,
       name:n,
       surname:s,
       address: a,
       phoneNum: p
    })
  }

  toggleHidden(id) {
     let current = !this.hiddens.find(o => o.order == id).hidden;
     this.hiddens.find(o => o.order == id).hidden = current;
  }

  getHidden(id: number) {
     return this.hiddens.find(o => o.order == id).hidden;
  }

  getTotal(id: number) {
    return this.hiddens.find(o => o.order == id).total;
  }
  getDateTime(id: number) {
    return this.hiddens.find(o => o.order == id).dateT;
  }

  onUpdate() {
    this.mySub = true;
    this.myLoad = true;
    if(this.myForm.invalid) {
      alert("Nevalidna forma.");
        this.myLoad = false;
        return;
    }
    let data = {
      email: this.user.email,
      name: this.edits.name.value,
      surname: this.edits.surname.value,
      address: this.edits.address.value,
      phoneNum: this.edits.phoneNum.value
    }
    console.log(data);
    this.userService.editMe(data).subscribe(res => {
      console.log(res);
      this.getMe();
      alert(res);
    }), err => { alert("Izmene nisu uspele.");
    console.log(err);
  }
  this.myLoad=false;
  }

  get edits() {
    return this.myForm.controls;
  }

  moreOrders() {
    this.numOfOrders +=5;
  }
  lessOrders() {
    if(this.numOfOrders>5)
    this.numOfOrders -=5;
    else
    return;
  }

}
