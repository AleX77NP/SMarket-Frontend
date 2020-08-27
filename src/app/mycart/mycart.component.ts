import { Router } from '@angular/router';
import { OrderItem } from './../models/order-item';
import { AdminService } from './../services/admin.service';
import { Coupon } from './../models/coupon';
import { UsersService } from './../services/users.service';
import { Component, OnInit} from '@angular/core';
import {CartColumnsComponent} from '../components/cart-columns/cart-columns.component';
import { CartItem } from '../models/cart-item';
import {CartService} from '../services/cart.service'
import { Order } from '../models/order';

@Component({
  selector: 'mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.css']
})
export class MycartComponent implements OnInit {

  items: CartItem[] = [];
  totalCart: number = 0;

  tax: number = 0;
  grand: number=0;

  coupons: Coupon[] = [];
  code: number=1;
  constructor(private cartService: CartService, private userService: UsersService, private adm: AdminService, protected router: Router) { }

  ngOnInit(): void {
    this.getItems();
    this.totalCart = this.cartService.getTotal();
    this.tax = this.cartService.getTax();
    this,this.grand = this.cartService.getGrand();
    this.getCoupons();
  }

  getTotalCart() {
    this.totalCart = this.cartService.getTotal();
  }
  getTax() {
    this.tax = this.cartService.getTax();
  }
  getGrand() {
    this.grand = this.cartService.getGrand();
  }
  getItems() {
    this.items = this.cartService.getCartItems();
  }

  getCoupons() {
    this.adm.getCoupons().subscribe(coupons => this.coupons = coupons.filter(c => c.valid==1));
  }

  increaseQty(item: CartItem) {
     this.cartService.increaseQty(item);
     this.getTotalCart();
     this.getTax();
     this.getGrand();
  }

  decreaseQty(item: CartItem) {
    this.cartService.decreaseQty(item);
    this.getItems();
    this.getTotalCart();
    this.getTax();
    this.getGrand();
  }

  removeFromCart(item: CartItem) {
    this.cartService.removeFromCart(item);
    this.getItems();
    this.getTotalCart();
    this.getTax();
     this.getGrand();
  }

  emptyCart() {
    this.cartService.emptyCart();
    this.getItems();
    this.getTotalCart();
    this.getTax();
    this.getGrand();
  }

  checkAuth() {
    return this.userService.checkAuth();
  }

  finishOrder() {
    if(this.checkAuth()==false) {
      alert("Molimo Vas da se prijavite ili registrujte kako bi završili porudžbinu.")
    }
    else {
      let discount = 0;
      let orderId = 1;
      let finalPrice = this.grand;
      let cond = 0;
      let user = this.userService.currentUser();
      let dateNow = new Date().toLocaleString();
      let ccode = this.code;
      let coupon = this.coupons.find(c => c.codeCoupon == ccode);
      if(coupon!==undefined) {
        discount = coupon.discount;
        cond = coupon.cond;
        if(this.totalCart>=cond)  {
        finalPrice = finalPrice - (this.totalCart*(discount/100));
        }
        else 
        finalPrice = this.grand;
      }
      else {
        finalPrice = this.grand;
      }
     let order = new Order(0,dateNow,finalPrice,user,ccode);
     this.userService.makeOrder(order).subscribe(res => {
       console.log(res)
       orderId = res.idOrder;
       this.items.forEach(item => {
         let oitem = new OrderItem(orderId,item.productId,item.qty,item.totalItem);
         this.userService.makeOrderItem(oitem).subscribe(res => console.log("success item"));
       }),
       setTimeout(() => {
        this.userService.getOrderInfo(orderId,user).subscribe(res => console.log(res));
        this.emptyCart();
       },750)
      // this.userService.getOrderInfo(orderId,user).subscribe(res => console.log(res));
       //this.emptyCart();
       }
     );
     alert("Hvala Vam na kupovini. Uskoro ćemo Vas kontaktirati putem mejla.");
     this.router.navigate(['/profile']);

    }
  }

  setCode(code:number) {
    this.code=code;
  }


}
