import { User } from "../user/user.model";

export class Post {
    id: number;
    creator: User;
    content: string;
    imageUrl: string;
    createdAt: string;

    constructor(id: number, creator: User, content: string, imageUrl: string, createdAt: string) {
        this.id = id;
        this.creator = creator;
        this.content = content;
        this.imageUrl = imageUrl;
        this.createdAt = createdAt;
    }
}