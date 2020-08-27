import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {Product} from 'src/app/models/product'
import { emit } from 'process';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() productItem : Product
  @Output() addToCart : EventEmitter<Product> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  onAdd(productItem) {
    this.addToCart.emit(productItem);
  }

}
