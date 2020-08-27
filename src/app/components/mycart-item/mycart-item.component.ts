import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import { getTranslationDeclStmts } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'mycart-item',
  templateUrl: './mycart-item.component.html',
  styleUrls: ['./mycart-item.component.css']
})
export class MycartItemComponent implements OnInit {

  @Input() item: CartItem
  @Output() increaseQty: EventEmitter<CartItem> = new EventEmitter();
  @Output() decreaseQty: EventEmitter<CartItem> = new EventEmitter();
  @Output() removeFromCart: EventEmitter<CartItem> = new EventEmitter();
  faTrash =  faTrash;

  constructor() { }

  ngOnInit(): void {
  }

  onIncrease(item) {
    this.increaseQty.emit(item);
  }

  onDecrease(item) {
    this.decreaseQty.emit(item);
  }

  onRemove(item) {
    this.removeFromCart.emit(item);
  }

}
