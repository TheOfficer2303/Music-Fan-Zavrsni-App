import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ApiPaths } from 'src/app/enums/ApiPath.enum';
import { IPostResponse, IRawPost } from 'src/app/interfaces/rawPost.interface';
import { baseUrl } from 'src/environments/environment';
import { User } from '../../models/user.model';
import { Post } from '../../models/post.model';
import { IRawComment } from 'src/app/interfaces/rawComment.interface';
import { Comment } from 'src/app/models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  public getPostsOfUser(creator: User) {
    const url = `${baseUrl}${ApiPaths.POSTS}`
    const query = `creator_id=${creator.id}`
    
    return this.http.get<IPostResponse>(`${url}?${query}`).pipe(
      map((response) => {
        return response.posts.map((post: IRawPost) => {
          let comments: Comment[] = [];
          comments = post.comments.map((comment: IRawComment) => {
            return new Comment(comment.id, post.id, comment.content, comment.commentatorId, comment.createdAt);
          });
          return new Post(post.id, creator, post.content, post.imageUrl, post.createdAt, comments);
        })
      })
    );
  }

  public createCommentOnPost(postId: number, content: string) {
    const url = `${baseUrl}${ApiPaths.COMMENTS}`
    const body = {
      comment: {
        postId,
        content
      }
    };
    console.log(body)

    return this.http.post<any>(url, body);
  }

  constructor(private http: HttpClient) { }
}
