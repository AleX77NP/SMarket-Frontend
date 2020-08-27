import { ThrowStmt } from '@angular/compiler';

export class Category {
    name: string;
    translated: string;

    constructor(name,translated) {
        this.name=name;
        this.translated=translated;
    }
}
