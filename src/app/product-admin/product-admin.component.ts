import { Supplier } from './../models/supplier';
import { Category } from './../models/category';
import { Product } from './../models/product';
import { UsersService } from './../services/users.service';
import { Router } from '@angular/router';
import { AdminService } from './../services/admin.service';
import { ProductService } from './../services/products.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { categories } from '../config/categories';


@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.css']
})
export class ProductAdminComponent implements OnInit {

  products: Product[] =[];
  categoriesP: Category[] = [];
  selectedCategory = categories[0];
  selectedProducts : Product[] = [];
  suppliers: Supplier[] = [];
  subC =  false;
  subE = false;
  createForm: FormGroup;
  editForm: FormGroup;
  catForm: FormGroup;
  editLoad: boolean = false;
  createLoad:boolean = false;
  catLoad = false;
  subCA = false;
  selectedOne: Product = null;

  constructor(private ps: ProductService, private adm: AdminService, protected router: Router, private us: UsersService, 
    private fb: FormBuilder) { }

  ngOnInit(): void {
    if(!this.us.checkAdmin()) {
      this.router.navigate(['/']);
    }
    this.initCatForm();
    this.initCreateForm();
    this.initEditForm();
    this.getCats();
    this.getSuppliers();
    this.getProducts();
  }

 getCats() {
   this.adm.getCategories().subscribe(cats => this.categoriesP = cats);
 } 

 getSuppliers() {
   this.adm.getSuppliers().subscribe(suppliers => this.suppliers = suppliers);
 }

 getProducts() {
   this.ps.getProducts().subscribe(products => {this.products = products
    this.selectedProducts = products.filter(p => p.category == this.selectedCategory.translated);
  });
 }

initCreateForm() {
  this.createForm = this.fb.group({
     name: ['', Validators.required],
     description: ['', Validators.required],
     price: ['', Validators.required],
     available: ['', Validators.required],
     category: ['', Validators.required],
     image: ['', Validators.required],
     idSupplier: ['', Validators.required]
  })
}

initEditForm() {
  this.editForm = this.fb.group({
    id: ['', Validators.required],
    nameE: ['', Validators.required],
    descriptionE: ['', Validators.required],
    priceE: ['', Validators.required],
    availableE: ['', Validators.required],
    categoryE: ['', Validators.required],
    imageE: ['', Validators.required],
    idSupplierE: ['', Validators.required]
  })
}

initCatForm() {
  this.catForm = this.fb.group({
    catName: ['', Validators.required],
    translated: ['', Validators.required]
  })
}

get newsP() {
  return this.createForm.controls;
}

get editsP() {
  return this.editForm.controls;
}

get newsC() {
  return this.catForm.controls;
}

changeCat(cat: string) {
  this.selectedProducts = this.products.filter(p => p.category == cat);
  console.log(cat);
}

onCreate() {
  if(this.newsP.price.value<10 || this.newsP.available.value<0) {
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
  let product = new Product(0, this.newsP.name.value, this.newsP.description.value, this.newsP.price.value, this.newsP.available.value,
    this.newsP.category.value, this.newsP.image.value, Number(this.newsP.idSupplier.value));
    console.log(product);

    this.adm.createProduct(product).subscribe(response => {alert(JSON.stringify("Proizvod dodat!"))
    console.log(response)
    this.getProducts();
  }, err => console.log(err)
    );
    this.createLoad=false;
}

onUpdate() {
  if(this.editsP.priceE.value<10 || this.editsP.availableE.value<0) {
    alert("Nevalidni podaci.");
      this.createLoad = false;
      return;
  }
  this.subE = true;
      this.editLoad = true;
      if(this.editForm.invalid) {
        alert("Nevalidna forma.");
        this.editLoad = false;
        return;
      }
    let product = new Product(this.editsP.id.value, this.editsP.nameE.value, this.editsP.descriptionE.value, this.editsP.priceE.value, this.editsP.availableE.value,
    this.editsP.categoryE.value, this.editsP.imageE.value, Number(this.editsP.idSupplierE.value));

    this.adm.updateProduct(product).subscribe(response => {alert(JSON.stringify("Proizvod izmenjen!"))
    console.log(response)
    this.getProducts();
  }, err => console.log(err)
    );
    this.editLoad=false;
}

selectOne(product: Product) {
   this.selectedOne = product;
   this.editForm.patchValue({
     id: this.selectedOne.id,
     nameE: this.selectedOne.name,
     descriptionE: this.selectedOne.description,
     priceE: this.selectedOne.price,
     availableE: this.selectedOne.available,
     categoryE: this.selectedOne.category,
     imageE: this.selectedOne.imageURL,
     idSupplierE: this.selectedOne.idSupplier
   })
}

deleteOne(id: number) {
  this.adm.deleteProduct(id).subscribe(
    response => {
      this.getProducts();
      alert("Proizvod je obrisan!");
      console.log(response);
    }), err => console.log(err);
}

newCategory() {
  this.subCA = true;
      this.catLoad = true;
      if(this.catForm.invalid) {
        alert("Nevalidna forma.");
        this.catLoad = false;
        return;
      }
    let cat =  new Category(this.newsC.catName.value, this.newsC.translated.value);
    this.adm.createCategory(cat).subscribe(response => {alert(JSON.stringify("Kategorija dodata!"))
    console.log(response)
    this.getCats();
  }, err => console.log(err)
    );
    this.catLoad=false;
}


}
