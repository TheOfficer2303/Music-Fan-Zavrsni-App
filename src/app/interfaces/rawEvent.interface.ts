import { User } from "../models/user.model";
import { IRawComment } from "./rawComment.interface";

export interface IEventResponse {
    events: Array<IRawEvent>
}

export interface IRawEvent {
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    startTime: string;
    address: string;
    organizator: User;
    location: string;
}