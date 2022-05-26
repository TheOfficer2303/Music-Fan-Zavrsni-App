import { User } from "./user.model";

export class Event {
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    startTime: string;
    address: string;
    organizator: User;
    location: string;

    constructor(id: number, name: string, description: string, startDate: string, endDate: string, startTime: string, address: string, organizator: User, location: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.startTime = startTime;
        this.address = address;
        this.organizator = organizator;
        this.location = location;
    }
}