import { IRawComment } from "./rawComment.interface";

export interface IPostResponse {
    posts: Array<IRawPost>
}

export interface IRawPost {
    id: number;
    content: string;
    creator_id: number;
    createdAt: string;
    imageUrl: string;
    comments: Array<IRawComment>;
}