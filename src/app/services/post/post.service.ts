import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ApiPaths } from 'src/app/enums/ApiPath.enum';
import { IPostResponse, IRawPost } from 'src/app/interfaces/rawPost.interface';
import { baseUrl } from 'src/environments/environment';
import { User } from '../user/user.model';
import { Post } from './post.model';

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
          return new Post(post.post_id, creator, post.content, post.image_url, post.created_at);
        })
      })
    );
  }

  constructor(private http: HttpClient) { }
}
