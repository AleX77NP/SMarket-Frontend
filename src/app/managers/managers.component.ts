import { UsersService } from './../services/users.service';
import { Router } from '@angular/router';
import { AdminService } from './../services/admin.service';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Manager } from '../models/manager';
import { Place } from '../models/place';

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.css']
})
export class ManagersComponent implements OnInit {

  managers: Manager[] = [];
  places: Place[] = [];
  selectedM: Manager = null;
  subC =  false;
  subE = false;
  createFormM: FormGroup;
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
    this.getPlaces();
    this.getManagers();
  }

getPlaces() {
  this.admn.getPlaces().subscribe(places => this.places = places);
}

getManagers() {
  this.admn.getManagers().subscribe(managers => this.managers = managers);
}

initCreateForm() {
    this.createFormM = this.fb.group({
      name: ['',Validators.required],
      surname: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      salary: [100, Validators.required],
      yearsOfS: [0, Validators.required],
      idPlace: ['', Validators.required]
    })
}

initEditForm() {
  this.editForm = this.fb.group({
      idManagerE: ['', Validators.required],
      nameE: ['',Validators.required],
      surnameE: ['', Validators.required],
      addressE: ['', Validators.required],
      phoneE: ['', Validators.required],
      salaryE: ['', Validators.required],
      yearsOfSE: ['', Validators.required],
      idPlaceE: ['', Validators.required]
  })
}

get news() {
  return this.createFormM.controls;
}

get edits() {
  return this.editForm.controls;
}

selectManager(m: Manager) {
  this.selectedM= m;
  this.editForm.patchValue({
    idManagerE: this.selectedM.idManager,
    nameE: this.selectedM.name,
    surnameE: this.selectedM.surname,
    addressE: this.selectedM.address,
    phoneE: this.selectedM.phone,
    salaryE: this.selectedM.salary,
    yearsOfSE: this.selectedM.yearsOfS,
    idPlaceE: this.selectedM.idPlace
  })
}

onCreate() {
  if(this.news.salary.value<100 || this.news.yearsOfS.value<1) {
    alert("Nevalidni podaci.");
    this.createLoad = false;
    return;
  }
  this.subC = true;
    this.createLoad = true;
    if(this.createFormM.invalid) {
      alert("Nevalidna forma.");
      this.createLoad = false;
      return;
    }
    let manager = new Manager(0,this.news.name.value, this.news.surname.value,this.news.address.value,this.news.phone.value,this.news.salary.value,
      this.news.yearsOfS.value,this.news.idPlace.value);
    this.admn.createManager(manager).subscribe(response => {alert(JSON.stringify("Novi poslovodja dodat!"))
    console.log(response)
    this.getManagers();
  }, err => console.log(err)
    );
    this.createLoad=false;
}

onUpdate() {
  if(this.edits.salaryE.value<100 || this.edits.yearsOfSE.value<1) {
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
    let manager = new Manager(this.edits.idWorkerE.value,this.edits.nameE.value, this.edits.surnameE.value,this.edits.addressE.value,this.edits.phoneE.value,this.edits.salaryE.value,
      this.edits.yearsOfSE.value,this.edits.idPlaceE.value);
    this.admn.updateManager(manager).subscribe(response => {alert(JSON.stringify("Poslovodja izmenjen!"))
    console.log(response)
    this.getManagers();
  }, err => console.log(err)
    );
    this.editLoad=false;
}

deleteSelected(id: number) {
  this.admn.deleteManager(id).subscribe(
    response => {
      this.getManagers();
      alert("Poslovodja obrisan!");
      console.log(response);
    }), err => console.log(err);
}
}
