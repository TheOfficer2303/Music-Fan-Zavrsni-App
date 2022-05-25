import { Comment } from "./comment.model";
import { User } from "./user.model";

export class Post {
    id: number;
    creator: User;
    content: string;
    imageUrl: string;
    createdAt: string;
    comments: Comment[];

    constructor(id: number, creator: User, content: string, 
        imageUrl: string, createdAt: string, comments: Comment[]) {
        this.id = id;
        this.creator = creator;
        this.content = content;
        this.imageUrl = imageUrl;
        this.createdAt = createdAt;
        this.comments = comments; 
    }
}