export class Country {
    countryIsoCode: string;
    name: string;

    constructor(countryIsoCode: string, name: string) {
        this.name = name;
        this.countryIsoCode = countryIsoCode;
    }
}