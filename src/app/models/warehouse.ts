export class Warehouse {
    idWarehouse: number;
    location: string;
    size: number;
    idPlace: number;

    constructor(idWarehouse:number, location:string, size:number, idPlace:number) {
        this.idWarehouse = idWarehouse;
        this.location=location;
        this.size=size;
        this.idPlace=idPlace;
    }
}
