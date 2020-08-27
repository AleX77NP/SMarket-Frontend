export class OrderItem {
    idOrder: number;
    idProduct: number;
    countP: number;
    price: number;

    constructor(idOrder:number,idProduct:number,countP:number,price:number) {
        this.idOrder=idOrder;
        this.idProduct=idProduct;
        this.countP=countP;
        this.price=price;
    }
}
