import { AdminService } from './../services/admin.service';
import { Component, OnInit } from '@angular/core';
import {Product} from 'src/app/models/product'
import {ProductService} from 'src/app/services/products.service'
import {CartService} from '../services/cart.service'
import { Category } from '../models/category';
import {categories} from '../config/categories'
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  selectedProducts: Product[] = [];
  temp: Product[] = [];
  productCategories: Category[] = [];
  selectedCategory = null;

  filterForm: FormGroup;

  constructor(private productService: ProductService, private cartService: CartService,private fb: FormBuilder, private adm: AdminService) { 
  }

  ngOnInit(): void {
  this.getCategories();
  this.createFilterForm();
}

getAllProducts() {
  this.productService.getProducts().subscribe((products: Product[]) => {
    this.products = products
    this.selectedProducts = products.filter(product => product.category==this.selectedCategory.translated)
  })
}

getCategories() {
  this.adm.getCategories().subscribe(cats => {this.productCategories = cats
    this.selectedCategory = categories[0];
    this.getAllProducts();
  });
}

createFilterForm() {
  this.filterForm = this.fb.group({
    min: [''],
    max: ['']
  })
}

addToCart(product: Product) {
   this.cartService.addToCart(product);
}

filterProducts() {
   var minPrice = Number(this.filterForm.controls.min.value);
   var maxPrice = Number(this.filterForm.controls.max.value);
  
  if(Number(minPrice) && Number(maxPrice) && minPrice < maxPrice && minPrice>=1 && maxPrice>=1) {
   this.selectedProducts = this.products.filter(product => product.price>=minPrice && product.price<=maxPrice &&
    product.category==this.selectedCategory.translated);
  }
  else {
    alert("Unete vrednosti nisu validne");
  }
}

setSelected(category: Category) {
  this.selectedCategory=category;
  this.selectedProducts = this.products.filter(product => product.category==category.translated);
}

getNumber(category:string) {
  return this.products.filter(product => product.category==category).length;
}

}
