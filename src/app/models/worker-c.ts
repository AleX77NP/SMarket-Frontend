export class WorkerC {
    idWorker: number;
    name:string;
    surname:string;
    address:string;
    phone:string;
    salary:number;
    shift:number;
    idPlace:number;
    idCashbox:number;
  
    constructor(idWorker:number, name:string, surname:string,address:string, phone:string, 
        salary:number, shift:number, idPlace:number, idCashbox:number) {
            this.idWorker=idWorker;
            this.name=name;
            this.surname=surname;
            this.address=address;
            this.phone=phone;
            this.salary=salary;
            this.shift=shift;
            this.idPlace=idPlace;
            this.idCashbox=idCashbox;
        }
}
