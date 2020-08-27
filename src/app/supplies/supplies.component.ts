import { Supply } from './../models/supply';
import { UsersService } from './../services/users.service';
import { Router } from '@angular/router';
import { AdminService } from './../services/admin.service';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Supplier } from '../models/supplier';
import { Place } from '../models/place';

@Component({
  selector: 'app-supplies',
  templateUrl: './supplies.component.html',
  styleUrls: ['./supplies.component.css']
})
export class SuppliesComponent implements OnInit {

  supplies: Supply[] = [];
  suppliers: Supplier[] = [];
  places: Place[] = [];
  selectedSupply: Supply = null;
  subC =  false;
  subE = false;
  createForm: FormGroup;
  editForm: FormGroup;
  editLoad: boolean = false;
  createLoad:boolean = false;
  today: string = (new Date().toISOString().slice(0,10));

  constructor(private admn: AdminService, private fb: FormBuilder, protected router: Router, private us: UsersService) { }

  ngOnInit(): void {
    if(!this.us.checkAdmin()) {
      this.router.navigate(['/']);
    }
    this.getPlaces();
    this.getSuppliers();
    this.getSupplies();
    this.initCreateForm();
    this.initEditForm();
  }

getSupplies() {
  this.admn.getSupplies().subscribe(supplies => this.supplies=supplies);
}
getSuppliers() {
  this.admn.getSuppliers().subscribe(suppliers => this.suppliers=suppliers);
}
getPlaces() {
  this.admn.getPlaces().subscribe(places => this.places=places);
}

initCreateForm() {
    this.createForm = this.fb.group({
      idPlace: ['',Validators.required],
      idSupplier: ['', Validators.required],
      product: ['',Validators.required],
      quantity: [1,Validators.required],
      date: [this.today,Validators.required]
    })
}

initEditForm() {
  this.editForm = this.fb.group({
      idSE: ['',Validators.required],
      idPlaceE: ['',Validators.required],
      idSupplierE: ['', Validators.required],
      productE: ['',Validators.required],
      quantityE: [1,Validators.required],
      dateE: ['',Validators.required]
  })
}

get news() {
  return this.createForm.controls;
}

get edtis() {
  return this.editForm.controls;
}

selectOne(s: Supply) {
  this.selectedSupply = s;
  this.editForm.patchValue({
    idSE: this.selectedSupply.idS,
    idPlaceE: this.selectedSupply.idPlace,
    idSupplierE: this.selectedSupply.idSupplier,
    productE: this.selectedSupply.product,
    quantityE: this.selectedSupply.quantity,
    dateE: this.selectedSupply.date
  })
}

onCreate() {
if(this.news.quantity.value<1) {
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
    let supply = new Supply(0,this.news.idPlace.value,this.news.idSupplier.value,this.news.product.value,this.news.quantity.value,this.news.date.value);
    this.admn.createSupply(supply).subscribe(response => {alert(JSON.stringify("Novo snabdevanje dodato!"))
    console.log(response)
    this.getSupplies();
  }, err => console.log(err)
    );
    this.createLoad=false;
}

deleteOne(id:number) {
  this.admn.deleteSupply(id).subscribe(
    response => {
      this.getSupplies();
      alert("Snabdevanje obrisano!");
      console.log(response);
    }), err => console.log(err);
}

onUpdate() {
  if(this.edtis.quantityE.value<1) {
    alert("Nevalidni podaci.");
      this.editLoad = false;
      return;
      }
      this.subE = true;
      this.editLoad = true;
      if(this.editForm.invalid) {
        alert("Nevalidna forma.");
        this.editLoad = false;
        return;
      }
    let supply = new Supply(this.edtis.idSE.value,this.edtis.idPlaceE.value,this.edtis.idSupplierE.value,this.edtis.productE.value,this.edtis.quantityE.value,this.edtis.dateE.value);
    this.admn.updateSupply(supply).subscribe(response => {alert(JSON.stringify("Snabdevanje izmenjeno!"))
    console.log(response)
    this.getSupplies();
  }, err => console.log(err)
    );
    this.editLoad=false;
}

}
