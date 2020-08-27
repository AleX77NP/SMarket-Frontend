    export class Product {
        id: number;
        name: string;
        description: string;
        price: number;
        available: number;
        category: string;
        imageURL: string;
        idSupplier: number;
    
        constructor(id:number,name:string,description:string,price:number,
            available:number,category:string,imageURL:string, idSupplier:number) {
            this.id =id;
            this.name=name;
            this.description=description;
            this.price=price;
            this.imageURL=imageURL;
            this.available=available;
            this.category=category;
            this.idSupplier=idSupplier;
        }
    }


