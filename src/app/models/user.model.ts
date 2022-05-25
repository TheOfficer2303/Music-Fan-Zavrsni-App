export class User {
    id: number;
    firstName: string;
    lastName: string;
    avatarUrl: string;
    info: string;
    location: string;

    constructor(id: number, firstName: string, lastName: string, avatarUrl: string, info: string, location: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.avatarUrl = avatarUrl;
        this.info = info;
        this.location = location;
    }
}