import { Cashbox } from './../models/cashbox';
import { UsersService } from './../services/users.service';
import { Router } from '@angular/router';
import { AdminService } from './../services/admin.service';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, Form} from '@angular/forms';
import { Place } from '../models/place';


@Component({
  selector: 'app-cashboxes',
  templateUrl: './cashboxes.component.html',
  styleUrls: ['./cashboxes.component.css']
})
export class CashboxesComponent implements OnInit {

  constructor(private admn: AdminService, private us : UsersService, protected router: Router, private fb: FormBuilder) { }

  cashboxes: Cashbox[] = [];
  places: Place[] = [];
  selectedCBox: Cashbox = null;

  subC =  false;
  subE = false;
  createForm: FormGroup;
  editForm: FormGroup;
  editLoad: boolean = false;
  createLoad:boolean=false;

  ngOnInit(): void {
    if(!this.us.checkAdmin()) {
      this.router.navigate(['/']);
    }
    this.initCreateForm();
    this.initEditForm();
    this.getPlaces();
    this.getCashboxes();
  }

  getPlaces() {
    this.admn.getPlaces().subscribe(places => this.places = places);
  }
  
  getCashboxes() {
    this.admn.getCashboxes().subscribe(cashboxes => this.cashboxes = cashboxes);
  }

  initCreateForm() {
    this.createForm = this.fb.group({
      brand: ['',Validators.required],
      idPlace: ['', Validators.required]
    })
  }

  initEditForm() {
    this.editForm = this.fb.group({
      idCashboxE: ['', Validators.required],
      brandE: ['',Validators.required],
      idPlaceE: ['', Validators.required]
    })
  }

  get news() {
    return this.createForm.controls;
  }

  get edtis() {
    return this.editForm.controls;
  }

  onCreate() {
    this.subC = true;
    this.createLoad = true;
    if(this.createForm.invalid) {
      alert("Nevalidna forma.");
      this.createLoad = false;
      return;
    }
    let box = new Cashbox(0,this.news.brand.value,this.news.idPlace.value);
    this.admn.createCashbox(box).subscribe(response => {alert(JSON.stringify("Nova kasa dodata!"))
    console.log(response)
    this.getCashboxes();
  }, err => console.log(err)
    );
    this.createLoad=false;
  }

selectCBox(cashbox: Cashbox) {
    this.selectedCBox = cashbox;
    this.editForm.patchValue({
      idCashboxE: this.selectedCBox.idCashbox,
      brandE: this.selectedCBox.brand,
      idPlaceE: this.selectedCBox.idPlace
    })
}

onUpdate() {
  this.editLoad=true;
  this.subE=true;
  if(this.editForm.invalid) {
    alert("Nevalidna forma.");
    this.editLoad = false;
    return;
  }
  let box = new Cashbox(this.edtis.idCashboxE.value, this.edtis.brandE.value, this.edtis.idPlaceE.value);
  this.admn.updateCashbox(box).subscribe(response => {
    this.getCashboxes();
    alert("Kasa izmenjena!");
    console.log(response);
  }), err => console.log(err);
  console.log(box);
  this.editLoad=false;
}

deleteSelected(id: number) {
this.admn.deleteCashbox(id).subscribe(response => {
  this.getCashboxes();
  alert("Kasa obrisana!");
  console.log(response);
}), err => console.log(err);
}

}
