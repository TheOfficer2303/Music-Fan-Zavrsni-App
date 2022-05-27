import { User } from "./user.model";

export class EventSubscription {
    user: User | string;
    event: Event | string;

    constructor(user: User | string, event: Event | string) {
        this.user = user;
        this.event = event;
    }
}

export class Event {
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    startTime: string;
    address: string;
    organizator: User | undefined;
    location: string | number;
    coming: Array<User>;

    constructor(id: number, name: string, description: string, startDate: string, endDate: string, 
        startTime: string, address: string, organizator: User | undefined, location: string | number,
        coming: Array<User>) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.startTime = startTime;
        this.address = address;
        this.organizator = organizator;
        this.location = location;
        this.coming = coming;
    }
}