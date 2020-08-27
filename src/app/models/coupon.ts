export class Coupon {
    codeCoupon: number;
    cond: number;
    valid: number;
    discount: number;

    constructor(codeCoupon:number, cond: number, valid:number, discount:number) {
        this.codeCoupon=codeCoupon;
        this.cond = cond;
        this.valid=valid;
        this.discount=discount;
    }
}
