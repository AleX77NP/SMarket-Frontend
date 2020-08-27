import { CartService } from './../services/cart.service';
import { ProductService } from 'src/app/services/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Product } from '../models/product';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product = null;
  path:string = "";

  constructor(private ps: ProductService, private route: ActivatedRoute, private location: Location, private cs: CartService) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.ps.getById(id).subscribe(product => {
      this.product=product
      if(product.imageURL.includes("assets"))
      this.path = `../${product.imageURL}`
      else
      this.path= product.imageURL;
    });
  }

  addToCart(product: Product) {
    this.cs.addToCart(product);
  }

  goBack() {
    this.location.back();
  }

}
