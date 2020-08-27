import { Coupon } from './../models/coupon';
import { AdminService } from './../services/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  coupons: Coupon[] = [];

  constructor(private adm: AdminService) { }

  ngOnInit(): void {
    this.getCoupons();
  }

getCoupons() {
  this.adm.getCoupons().subscribe(coupons => this.coupons = coupons.filter(c=> c.valid ==1));
}

}
