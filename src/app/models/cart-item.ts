import { Product } from './product';

export class CartItem {
    id: number;
    productId: number;
    productName : string;
    qty: number;
    price: number;
    totalItem : number;
    img : string;
    available: number;

    constructor(id: number, product: Product,qty=1) {
       this.id =id;
       this.productId = product.id;
       this.price = product.price;
       this.qty = qty;
       this.totalItem = 0;
       this.productName = product.name;
       this.img = product.imageURL
       this.available = product.available
    }
}
