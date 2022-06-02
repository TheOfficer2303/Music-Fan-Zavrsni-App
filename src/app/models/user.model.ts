import { AppRoles } from "../consts/roles.constants";

export class User {
    id: number;
    firstName: string;
    lastName: string;
    avatarUrl: string;
    info: string;
    location: string;
    abilityLevel: AppRoles;

    constructor(id: number, firstName: string, lastName: string, avatarUrl: string, info: string, location: string, abilityLevel: AppRoles) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.avatarUrl = avatarUrl;
        this.info = info;
        this.location = location;
        this.abilityLevel = abilityLevel;
    }
}