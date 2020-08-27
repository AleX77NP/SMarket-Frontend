import { Coupon } from './../models/coupon';
import { UsersService } from './../services/users.service';
import { Router } from '@angular/router';
import { AdminService } from './../services/admin.service';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent implements OnInit {

  coupons: Coupon[] = [];
  selectedCoupon: Coupon = null;
  subC =  false;
  subE = false;
  createForm: FormGroup;
  editForm: FormGroup;
  editLoad: boolean = false;
  createLoad:boolean = false;
  choices = [
    {value: 1, ind:'DA'}, {value: 0, ind:'NE'}
  ]
  constructor(private admn: AdminService, private fb: FormBuilder, protected router: Router, private us: UsersService) { }

  ngOnInit(): void {
    if(!this.us.checkAdmin()) {
      this.router.navigate(['/']);
    }
    this.initCreateForm();
    this.initEditForm();
    this.getCoupons();
  }

getCoupons() {
  this.admn.getCoupons().subscribe(coupons => this.coupons = coupons);
}

initCreateForm() {
    this.createForm = this.fb.group({
      codeCoupon: ['',Validators.required],
      expires: [1, Validators.required],
      valid: ['', Validators.required],
      discount: [1, Validators.required]
    })
}

initEditForm() {
  this.editForm = this.fb.group({
    codeCouponE: ['',Validators.required],
    expiresE: [1, Validators.required],
    Evalid: ['', Validators.required],
    discountE: [1, Validators.required]
  })
}

get news() {
  return this.createForm.controls;
}

get edits() {
  return this.editForm.controls;
}

selectCoupon(coupon: Coupon) {
  this.selectedCoupon = coupon;
  this.editForm.patchValue({
    codeCouponE: this.selectedCoupon.codeCoupon,
    expiresE: this.selectedCoupon.cond,
    Evalid: Boolean(this.selectedCoupon.valid),
    discountE: this.selectedCoupon.discount
  })
}

onCreate() {

  if(Number(this.news.expires.value)<1000 || Number(this.news.discount.value)<5) {
    alert("Nevalidni podaci.");
    this.createLoad = false;
    return;
  }
  this.subC = true;
    this.createLoad = true;
    if(this.createForm.invalid) {
      alert("Nevalidna forma.");
      this.createLoad = false;
      return;
    }
    let coupon =  new Coupon(this.news.codeCoupon.value,this.news.expires.value,Number(this.news.valid.value),this.news.discount.value);
    this.admn.createCoupon(coupon).subscribe(response => {alert(JSON.stringify("Novi kupon dodat!"))
    console.log(response)
    this.getCoupons();
  }, err => console.log(err)
    );
    this.createLoad=false;
}

onUpdate() {
  if(Number(this.edits.expiresE.value)<1000 || Number(this.edits.discountE.value)<5) {
    alert("Nevalidni podaci.");
    this.createLoad = false;
    return;
  }

  if(this.editForm.invalid) {
    alert("Nevalidna forma.");
    this.editLoad = false;
    return;
  }
    this.editLoad = true;
    this.subE = true;
    let coupon =  new Coupon(this.edits.codeCouponE.value,this.edits.expiresE.value,Number(this.edits.Evalid.value),this.edits.discountE.value);
    this.admn.updateCoupon(coupon).subscribe(response => {alert(JSON.stringify("Kupon izmenjen!"))
    console.log(response)
    this.getCoupons();
  }, err => console.log(err)
    );
    this.editLoad=false;
}

deleteSelected(id: number) {
  this.admn.deleteCoupon(id).subscribe(
    response => {
      this.getCoupons();
      alert("Kupon obrisan!");
      console.log(response);
    }), err => console.log(err);
}

}
