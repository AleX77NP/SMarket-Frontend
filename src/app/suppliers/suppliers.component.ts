import { Supplier } from './../models/supplier';
import { UsersService } from './../services/users.service';
import { Router } from '@angular/router';
import { AdminService } from './../services/admin.service';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {

  suppliers: Supplier[] = [];
  selectedSupplier: Supplier = null;
  subC =  false;
  subE = false;
  createForm: FormGroup;
  editForm: FormGroup;
  editLoad: boolean = false;
  createLoad:boolean = false;

  constructor(private admn: AdminService, private fb: FormBuilder, protected router: Router, private us: UsersService) { }

  ngOnInit(): void {
    if(!this.us.checkAdmin()) {
      this.router.navigate(['/']);
    }
    this.initCreateForm();
    this.initEditForm();
    this.getSuppliers();
  }

getSuppliers() {
  this.admn.getSuppliers().subscribe(suppliers => this.suppliers = suppliers);
}

initCreateForm() {
    this.createForm = this.fb.group({
      name: ['',Validators.required],
      location: ['', Validators.required]
    })
}

initEditForm() {
  this.editForm = this.fb.group({
    idSupplierE: ['', Validators.required],
    nameE: ['',Validators.required],
    locationE: ['', Validators.required],
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
  let supplier = new Supplier(0,this.news.name.value, this.news.location.value);
  this.admn.createSupplier(supplier).subscribe(response => {alert(JSON.stringify("Novi snabdevač dodat!"))
  console.log(response)
  this.getSuppliers();
}, err => console.log(err)
  );
  this.createLoad=false;
}

onUpdate() {
  if(this.editForm.invalid) {
    alert("Nevalidna forma.");
    this.editLoad = false;
    return;
  }
  this.editLoad=true;
  this.subE=true;
  let supplier = new Supplier(this.edtis.idSupplierE.value, this.edtis.nameE.value, this.edtis.locationE.value);
  this.admn.updateSupplier(supplier).subscribe(response => {
    this.getSuppliers();
    alert("Snabdevač izmenjen!");
    console.log(response);
  }), err => console.log(err);
  console.log(supplier);
  this.editLoad=false;
}

selectSupplier(supplier: Supplier) {
  this.selectedSupplier = supplier;
  this.editForm.patchValue({
    idSupplierE: this.selectedSupplier.idSupplier,
    nameE: this.selectedSupplier.name,
    locationE: this.selectedSupplier.location,
  })
}

deleteSelected(id: number) {
  this.admn.deleteSupplier(id).subscribe(response => {
    this.getSuppliers();
    alert("Snabdevač obrisan!");
    console.log(response);
  }), err => console.log(err);
}

}
