export interface IPostResponse {
    posts: Array<IRawPost>
}

export interface IRawPost {
    post_id: number;
    content: string;
    creator_id: number;
    created_at: string;
    image_url: string
}