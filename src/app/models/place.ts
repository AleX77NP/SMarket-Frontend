export class Place {
    idPlace: number;
    address: string;
    size: number;

    constructor(idPlace:number, address:string,size:number) {
        this.idPlace=idPlace;
        this.address=address;
        this.size=size;
    }
}
