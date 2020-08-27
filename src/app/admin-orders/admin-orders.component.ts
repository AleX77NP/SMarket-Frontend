import { Router } from '@angular/router';
import { UsersService } from './../services/users.service';
import { AdminService } from './../services/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  numOfOrders = 5;
  customer = "";
  orders = [];
  hiddens = [];
  sortedOrders = [];
  allOrders: Array<any>[] = [];

  constructor(private adm: AdminService, private us: UsersService, protected router: Router) { }

  ngOnInit(): void {
    if(!this.us.checkAdmin()) {
      this.router.navigate(['/']);
    }
    this.getOrders();
  }

  getOrders() {
    this.adm.getAllOrders().subscribe(res => {
      console.log(res); this.orders=res
      if(res!==null) {
         var results = this.orders.reduce(function(results, order){
           (results[order.idOrder]= results[order.idOrder] || []).push(order);
           return results;
         },{})
        this.sortedOrders = results;
        this.orders.forEach(o => {
          this.hiddens.push({hidden: true, order: o.idOrder, total: o.totalPrice, user: o.email, dateT: o.dateOrder})
        })
        console.log(results);
      }
    });
  }

  getOrdersByUser(user) {
    this.adm.getAllOrders().subscribe(res => {
      console.log(res); this.orders=res.filter(o => o.email == user);
      if(res!==null) {
         var results = this.orders.reduce(function(results, order){
           (results[order.idOrder]= results[order.idOrder] || []).push(order);
           return results;
         },{})
        this.sortedOrders = results;
        this.orders.forEach(o => {
          this.hiddens.push({hidden: true, order: o.idOrder, total: o.totalPrice, user: o.email, dateT: o.dateOrder})
        })
        console.log(results);
      }
    });
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

 getCustomer(id: number) {
   return this.hiddens.find(o => o.order == id).user;
 }
 getDateTime(id: number) {
   return this.hiddens.find(o => o.order == id).dateT;
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

 onSearch(e:string) {
   this.customer = e;
   if(e == "") 
   this.getOrders();
 }

 searchOrders()
 {
   this.getOrdersByUser(this.customer);
 }

 deleteIt(idO) {
   let id = Number(idO);
   this.adm.deleteOrder(id).subscribe(
    response => {
      this.getOrders();
      alert("Obrisano!");
      console.log(response);
    }), err => console.log(err);
 }
}
