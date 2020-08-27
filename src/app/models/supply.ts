export class Supply {
    idS: number;
    idPlace: number;
    idSupplier: number;
    product: string;
    quantity: number;
    date: string;

    constructor(idS: number, idPlace:number, idSupplier: number, product:string, quantity: number, date:string) {
        this.idS = idS;
        this.idPlace = idPlace;
        this.idSupplier = idSupplier;
        this.product = product;
        this.quantity = quantity;
        this.date=date;
    }
}
