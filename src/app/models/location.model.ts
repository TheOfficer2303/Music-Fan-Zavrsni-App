import { ILocationResponse } from "src/app/interfaces/locationResponse.interface";

export class Location {
    name: string;
    postNumber: number;
    countryIsoCode: string;

    constructor(name:string, postNumber: number, countryIsoCode:string) {
        console.log(postNumber)
        this.name = name;
        this.postNumber = postNumber
        this.countryIsoCode = countryIsoCode
    }
}