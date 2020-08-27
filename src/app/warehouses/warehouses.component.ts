import { UsersService } from './../services/users.service';
import { Router } from '@angular/router';
import { Warehouse } from './../models/warehouse';
import { AdminService } from './../services/admin.service';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Place } from '../models/place';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.css']
})
export class WarehousesComponent implements OnInit {

  selectedWarehouse: Warehouse = null;
  warehouses: Warehouse[] = [];
  places: Place[] = [];

  subC =  false;
  subE = false;
  createForm: FormGroup;
  editForm: FormGroup;
  editLoad: boolean = false;
  createLoad:boolean=false;

  constructor(private admn: AdminService, private fb: FormBuilder, protected router: Router, private us: UsersService) { }

  ngOnInit(): void {
    if(!this.us.checkAdmin()) {
      this.router.navigate(['/']);
    }
    this.getWarehouses();
    this.getPlaces();
    this.initCreateForm();
    this.initEditForm();
  }

  getWarehouses() {
    this.admn.getWarehouses().subscribe(warehouses => this.warehouses = warehouses);
  }

  getPlaces() {
    this.admn.getPlaces().subscribe(places => this.places = places);
  }

  initCreateForm() {
    this.createForm = this.fb.group({
      location: ['', Validators.required],
      size: ['',Validators.required],
      idPlace: ['', Validators.required]
    })
  }

  initEditForm() {
    this.editForm = this.fb.group({
      idWarehouseE: ['', Validators.required],
      locationE: ['', Validators.required],
      sizeE: ['',Validators.required],
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
    if(this.news.size.value<50) {
      alert("Magacin mora imati najmanje 50 kvadrata.");
      return;
    }
    this.subC = true;
    this.createLoad = true;
    if(this.createForm.invalid) {
      alert("Nevalidna forma.");
      this.createLoad = false;
      return;
    }
    let warehouse = new Warehouse(0,this.news.location.value,this.news.size.value,this.news.idPlace.value);
    this.admn.createWarehouse(warehouse).subscribe(response => {alert(JSON.stringify("Novi magacin dodat!"))
    console.log(response)
    this.getWarehouses();
  }, err => console.log(err)
    );
    this.createLoad=false;
  }

  onUpdate() {
    if(this.edtis.sizeE.value<50) {
      alert("Magacin mora imati najmanje 50 kvadrata.");
      return;
    }
    if(this.editForm.invalid) {
      alert("Nevalidna forma.");
      this.editLoad = false;
      return;
    }
    this.editLoad=true;
    this.subE=true;
    let warehouse = new Warehouse(this.edtis.idWarehouseE.value, this.edtis.locationE.value, this.edtis.sizeE.value, this.edtis.idPlaceE.value);
    this.admn.updateWarehouse(warehouse).subscribe(response => {
      this.getWarehouses();
      alert("Magacin izmenjen!");
      console.log(response);
    }), err => console.log(err);
    console.log(warehouse);
    this.editLoad=false;
  }

  selectWarehouse(warehouse:Warehouse) {
    this.selectedWarehouse = warehouse;
    this.editForm.patchValue({
      idWarehouseE: this.selectedWarehouse.idWarehouse,
      locationE: this.selectedWarehouse.location,
      sizeE: this.selectedWarehouse.size,
      idPlaceE: this.selectedWarehouse.idPlace
    })
  }

  deleteSelected(id: number) {
    this.admn.deleteWarehouse(id).subscribe(response => {
      this.getWarehouses();
      alert("Magacin obrisan!");
      console.log(response);
    }), err => console.log(err);
  }

}
