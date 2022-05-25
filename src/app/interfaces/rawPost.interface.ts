export interface IPostResponse {
    posts: Array<IRawPost>
}

export interface IRawPost {
    id: number;
    content: string;
    creator_id: number;
    createdAt: string;
    imageUrl: string
}