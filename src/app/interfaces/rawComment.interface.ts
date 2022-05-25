import { User } from "../models/user.model";

export interface IRawComment {
    id: number;
    content: string;
    commentatorId: User;
    createdAt: string;
    post_id: number;

}