import { Injectable } from '@angular/core';
import {Product} from 'src/app/models/product'
import {CartItem} from 'src/app/models/cart-item'
import {MessagerService} from 'src/app/services/message.service'
//import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems : CartItem[] = [];
  cartTotal : number = 0;
  tax: number = 0;
  grand:number = 0;

  constructor(private msg: MessagerService) { 
    try {
    let dataB = localStorage.getItem('cart');
  //  let secret = "acoaco77";
    console.log(dataB);
   // var itemsA = CryptoJS.AES.decrypt(dataB,secret).toString(CryptoJS.enc.Utf8);
   try {this.cartItems = dataB!=null? JSON.parse(dataB): [];}
   catch(e) {
     this.cartItems = [];
   }
    //var total = JSON.parse(localStorage.getItem('total'));
   // var tax = JSON.parse(localStorage.getItem('tax'));
   // var grand = JSON.parse(localStorage.getItem('grand'));
   // this.cartItems = items? items: [];
  // this.cartItems = [];
    try {this.cartItems.forEach(item => this.cartTotal += item.price*item.qty);
    this.tax = this.cartTotal*0.05;
    this.grand = this.cartTotal + this.tax;
    }
    catch(e) {
      this.cartTotal = 0;
    this.grand = 0;
    this.tax = 0;
    }
  }
  catch(e) {
    this.cartItems = [];
    this.cartTotal = 0;
    this.grand = 0;
    this.tax = 0;
  }
  }

  getCartItems() {
    return this.cartItems;
  }

  addToCart(product: Product) {
    let inCart = false;

    for(let i in this.cartItems) {
      if(this.cartItems[i].productId === product.id) {
        this.cartItems[i].qty++
        this.cartItems[i].available--;
        this.cartItems[i].totalItem = this.cartItems[i].price*this.cartItems[i].qty;
        inCart = true;
        alert("Artikal se nalazi u korpi, kvantitet je promenjen.")
        break;
      }
  }
    if(!inCart) {
      
      var newItem = new CartItem(this.cartItems.length+1,product);
      newItem.totalItem = newItem.price;
      newItem.available = newItem.available - 1;
      this.cartItems.push(newItem);
      this.cartTotal = 0;
      this.cartItems.forEach(item => {
      this.cartTotal += (item.price * item.qty)})
      this.tax = this.cartTotal*0.05;
      this.grand = this.cartTotal + this.tax;
      this.saveCart(this.cartItems, this.cartTotal, this.tax, this.grand);
      alert("Dodato u korpu!")
  }

    this.cartTotal = 0;
    this.cartItems.forEach(item => {
      this.cartTotal += (item.price * item.qty)
      this.tax = this.cartTotal*0.05;
     this.grand = this.cartTotal + this.tax;
    this.saveCart(this.cartItems, this.cartTotal, this.tax, this.grand);
    });
  }

  increaseQty(item: CartItem) {
    var index = this.cartItems.indexOf(item);
    var selectedItem = this.cartItems[index];
   
    selectedItem.qty++;
    selectedItem.available--;
    selectedItem.totalItem = selectedItem.price*selectedItem.qty;
    
    this.cartTotal = 0;
    this.cartItems.forEach(item => {
     this.cartTotal += (item.price * item.qty)
     this.tax = this.cartTotal*0.05;
     this.grand = this.cartTotal + this.tax;
  }); 
     
    this.saveCart(this.cartItems, this.cartTotal, this.tax, this.grand);
}

  decreaseQty(item: CartItem) {
  var index = this.cartItems.indexOf(item);
  var selectedItem = this.cartItems[index];
  selectedItem.qty--;
  selectedItem.totalItem = selectedItem.price*selectedItem.qty;

  if(selectedItem.qty<1) {
    this.cartItems = this.cartItems.filter(item => item.id !== selectedItem.id);
    this.cartTotal = 0;
    this.cartItems.forEach(item => {
     this.cartTotal += (item.price * item.qty)});
     this.tax = this.cartTotal*0.05;
     this.grand = this.cartTotal + this.tax;
    this.saveCart(this.cartItems, this.cartTotal, this.tax, this.grand);
  }
  
   this.cartTotal = 0;
   this.cartItems.forEach(item => {
   this.cartTotal += (item.price * item.qty)
   this.tax = this.cartTotal*0.05;
    this.grand = this.cartTotal + this.tax;
    this.saveCart(this.cartItems, this.cartTotal, this.tax, this.grand);
}); }

  removeFromCart(item: CartItem) {
    var index = this.cartItems.indexOf(item);
    var selectedItem = this.cartItems[index];
    this.cartItems = this.cartItems.filter(item => item.id !== selectedItem.id);
  
    this.cartTotal = 0;
    this.cartItems.forEach(item => {
     this.cartTotal += (item.price * item.qty)});
     this.tax = this.cartTotal*0.05;
     this.grand = this.cartTotal + this.tax;
    this.saveCart(this.cartItems, this.cartTotal, this.tax, this.grand);
  }

  getTotal() {
    return this.cartTotal;
  }

  getTax() {
     return this.tax;
  }
  getGrand() {
    return this.grand;
  }

  emptyCart() {
    this.cartItems = [];
    this.cartTotal = 0;
    this.tax = 0;
    this.grand = 0;
   this.saveCart(this.cartItems, this.cartTotal, this.tax, this.grand);
  }

  getItemsCount() {
     var count = 0;
     this.cartItems.forEach(item => count+=item.qty);
     return count;
  }

  saveCart(cart: CartItem[], total:number, tax: number, grand: number) {
    // let secret = "acoaco77";
    // let data = CryptoJS.AES.encrypt(JSON.stringify(cart),secret).toString();
   //  localStorage.setItem('cart',JSON.stringify(cart));
     localStorage.setItem('cart',JSON.stringify(cart));
    // localStorage.removeItem('enc');
    // localStorage.setItem('total',JSON.stringify(total));
   //  localStorage.setItem('tax', JSON.stringify(tax));
    // localStorage.setItem('grand', JSON.stringify(grand));
  }
}
