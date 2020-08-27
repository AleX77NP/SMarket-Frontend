import { AdminService } from './../services/admin.service';
import { Router } from '@angular/router';
import { UsersService } from './../services/users.service';
import { Component, OnInit } from '@angular/core';
import { faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import {CartService} from '../services/cart.service'
//import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  faCart = faShoppingCart;


  constructor(private cartService: CartService, private userService: UsersService, protected router: Router, private adm: AdminService) { }

  ngOnInit(): void {
  }

  getCount() {
    return this.cartService.getItemsCount();
  }
  getAuth() {
    return this.userService.checkAuth();
  }

  isAdmin() {
    return this.userService.checkAdmin();
  }

  logoutAdmin() {
    this.userService.logout();
    this.router.navigate(['/']);
  }

}
