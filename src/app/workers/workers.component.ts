import { WorkerC } from './../models/worker-c';
import { Cashbox } from './../models/cashbox';
import { UsersService } from './../services/users.service';
import { Router } from '@angular/router';
import { AdminService } from './../services/admin.service';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Place } from '../models/place';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css']
})
export class WorkersComponent implements OnInit {

  workers: WorkerC[] = [];
  places: Place[] = [];
  boxes: Cashbox[] = [];
  selectedW: WorkerC = null;
  subC =  false;
  subE = false;
  createFormM: FormGroup;
  editForm: FormGroup;
  editLoad: boolean = false;
  createLoad:boolean = false;

  shifts = [
    {id:1, value: 1},
    {id:2, value:2}
  ]


  constructor(private admn: AdminService, private fb: FormBuilder, protected router: Router, private us: UsersService) { }

  ngOnInit(): void {
    if(!this.us.checkAdmin()) {
      this.router.navigate(['/']);
    }
    this.getWorkers();
    this.initCreateForm();
    this.initEditForm();
    this.getPlaces();
    this.getCashboxes();
  }

getPlaces() {
    this.admn.getPlaces().subscribe(places => this.places = places);
  }

getCashboxes() {
this.admn.getCashboxes().subscribe(cashboxes => this.boxes=cashboxes);
}

getWorkers() {
  this.admn.getWorkers().subscribe(workers => this.workers=workers);
}

initCreateForm() {
  this.createFormM = this.fb.group({
    name: ['',Validators.required],
    surname: ['', Validators.required],
    address: ['', Validators.required],
    phone: ['', Validators.required],
    salary: [100, Validators.required],
    shift: [1, Validators.required],
    idPlace: ['', Validators.required],
    idCashbox: ['',Validators.required]
  })
}

initEditForm() {
    this.editForm = this.fb.group({
    idWorkerE: ['', Validators.required],
    nameE: ['',Validators.required],
    surnameE: ['', Validators.required],
    addressE: ['', Validators.required],
    phoneE: ['', Validators.required],
    salaryE: ['', Validators.required],
    shiftE: ['', Validators.required],
    idPlaceE: ['', Validators.required],
    idCashboxE: ['',Validators.required]
})
}

get news() {
  return this.createFormM.controls;
}

get edits() {
  return this.editForm.controls;
}

deleteSelected(id: number) {
  this.admn.deleteWorker(id).subscribe(
    response => {
      this.getWorkers();
      alert("Radnik obrisan!");
      console.log(response);
    }), err => console.log(err);
}

selectWorker(w: WorkerC) {
  this.selectedW= w;
  this.editForm.patchValue({
    idWorkerE: this.selectedW.idWorker,
    nameE: this.selectedW.name,
    surnameE: this.selectedW.surname,
    addressE: this.selectedW.address,
    phoneE: this.selectedW.phone,
    salaryE: this.selectedW.salary,
    shiftE: Number(this.selectedW.shift),
    idPlaceE: this.selectedW.idPlace,
    idCashboxE: this.selectedW.idCashbox
  })
}

onCreate() {
  if(this.news.salary.value<100) {
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
    let worker = new WorkerC(0,this.news.name.value, this.news.surname.value,this.news.address.value,this.news.phone.value,this.news.salary.value,
      this.news.shift.value,this.news.idPlace.value, this.news.idCashbox.value);
    this.admn.createWorker(worker).subscribe(response => {alert(JSON.stringify("Novi radnik dodat!"))
    console.log(response)
    this.getWorkers();
  }, err => console.log(err)
    );
    this.createLoad=false;
}

onUpdate() {
  if(this.edits.salaryE.value<100) {
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
    let worker = new WorkerC(this.edits.idWorkerE.value,this.edits.nameE.value, this.edits.surnameE.value,this.edits.addressE.value,this.edits.phoneE.value,this.edits.salaryE.value,
      this.edits.shiftE.value,this.edits.idPlaceE.value, this.edits.idCashboxE.value);
    this.admn.updateWorker(worker).subscribe(response => {alert(JSON.stringify("Radnik izmenjen!"))
    console.log(response)
    this.getWorkers();
  }, err => console.log(err)
    );
    this.editLoad=false;
}

}
