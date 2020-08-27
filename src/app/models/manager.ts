export class Manager {
    idManager: number;
    name:string;
    surname:string;
    address:string;
    phone:string;
    salary:number;
    yearsOfS:number;
    idPlace:number;

    constructor(idManager:number, name:string, surname:string,address:string, phone:string, 
        salary:number, yearsOfS:number, idPlace:number) {
            this.idManager=idManager;
            this.name=name;
            this.surname=surname;
            this.address=address;
            this.phone=phone;
            this.salary=salary;
            this.yearsOfS=yearsOfS;
            this.idPlace=idPlace;
        }
}
