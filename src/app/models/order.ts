export class Order {
    idOrder: number;
    dateOrder: string;
    totalPrice: number;
    email: string;
    couponCode: number;

    constructor(idOrder: number, dateOrder:string, totalPrice:number,email:string,couponCode: number) {
        this.idOrder = idOrder;
        this.dateOrder=dateOrder;
        this.totalPrice=totalPrice;
        this.email=email;
        this.couponCode=couponCode;
    }
}
