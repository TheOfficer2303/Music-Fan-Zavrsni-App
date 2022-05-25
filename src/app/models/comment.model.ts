import { User } from "./user.model";

export class Comment {
    id: number;
    postId: number;
    content: string;
    commentator: User;
    createdAt: string;

    constructor(id: number, postId: number, content: string, commentator: User, createdAt: string) {
        this.id = id;
        this.postId = postId;
        this.content = content;
        this.commentator = commentator;
        this.createdAt = createdAt;
    }


}