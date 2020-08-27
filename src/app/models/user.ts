export class User {
    email: string;
    password: string;
    name: string;
    surname: string;
    address: string;
    phoneNum: string;
    admin: number

    constructor(email:string,password:string, name:string,surname:string,address:string,phoneNum:string,admin:number) {
       this.email=email;
       this.password=password;
       this.name=name;
       this.surname=surname;
       this.address=address;
       this.phoneNum=phoneNum;
       this.admin = admin;
    }
}
