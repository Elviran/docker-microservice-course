export class Student {
    id: number | undefined;
    name: string;
    surname: string;
    age: number;
    address: string;
    scholasticYear: string;

    constructor(name:string, surname:string, age:number, address:string, scholasticYear:string) {
        this.name = name;
        this.surname = surname;
        this.age = age;
        this.address = address;
        this.scholasticYear = scholasticYear;
    }
}