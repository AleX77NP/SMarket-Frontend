import { Router } from '@angular/router';
import { UsersService } from './../services/users.service';
import { AdminService } from './../services/admin.service';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Place } from '../models/place';


@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {

  places: Place[] = [];
  selectedPlace: Place = null;

  
  subC =  false;
  subE = false;
  createForm: FormGroup;
  editForm: FormGroup;
  editLoad: boolean = false;
  createLoad:boolean=false;

  constructor(private fb: FormBuilder, private adm: AdminService, private us: UsersService, protected router: Router) { }

  ngOnInit(): void {
    if(!this.us.checkAdmin()) {
      this.router.navigate(['/']);
    }
    this.getPlaces();
    this.initCreateForm();
    this.initEditForm();
  }

  getPlaces() {
    this.adm.getPlaces().subscribe(places => this.places = places);
  }

  initCreateForm() {
    this.createForm = this.fb.group({
      address: ['', Validators.required],
      size: ['',Validators.required]
    })
  }

  initEditForm() {
    this.editForm = this.fb.group({
      idPlaceE: ['', Validators.required],
      addressE: ['', Validators.required],
      sizeE: ['',Validators.required]
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
      alert("Mesto mora imati najmanje 50 kvadrata.");
      return;
    }
    this.subC = true;
    this.createLoad = true;
    if(this.createForm.invalid) {
      alert("Nevalidna forma.");
      this.createLoad = false;
      return;
    }
    let place = new Place(0,this.news.address.value,this.news.size.value);
    this.adm.createPlace(place).subscribe(response => {alert(JSON.stringify("Novo mesto dodato!"))
    console.log(response)
    this.getPlaces();
  }, err => console.log(err)
    );
    this.createLoad=false;
  }

  deleteSelected(id: number) {
    this.adm.deletePlace(id).subscribe(response => {
      alert("Mesto obrisano!");
      console.log(response);
    }), err => console.log(err);
    this.getPlaces();
  }

  selectPlace(place:Place) {
    this.selectedPlace = place;
    this.editForm.patchValue({
      idPlaceE: this.selectedPlace.idPlace,
      addressE: this.selectedPlace.address,
      sizeE: this.selectedPlace.size
    })
  }


  onUpdate() {
    if(this.edtis.sizeE.value<50) {
      alert("Mesto mora imati najmanje 50 kvadrata.");
      return;
    }
    if(this.editForm.invalid) {
      alert("Nevalidna forma.");
      this.editLoad = false;
      return;
    }
    this.editLoad=true;
    this.subE=true;
    let updated  = new Place(Number(this.edtis.idPlaceE.value), this.edtis.addressE.value, Number(this.edtis.sizeE.value));
    this.adm.updatePlace(updated).subscribe(response => {
      this.getPlaces();
      alert("Mesto izmenjeno!");
      console.log(response);
    }), err => console.log(err);
    console.log(updated);
    this.editLoad=false;
  }

}
