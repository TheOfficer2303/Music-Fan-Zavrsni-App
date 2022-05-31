import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { ApiPaths } from 'src/app/enums/ApiPath.enum';
import { IAuthData } from 'src/app/interfaces/authData.interface';
import { IRawUser } from 'src/app/interfaces/rawUser.interface';
import { baseUrl } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { User } from '../../models/user.model';
import { Post } from 'src/app/models/post.model';
import { IRawComment } from 'src/app/interfaces/rawComment.interface';
import { Comment } from 'src/app/models/comment.model';
import { Event } from 'src/app/models/event.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  public getUserById(id: string | number) {
    return this.http.get<IRawUser>(`${baseUrl}${ApiPaths.USER}/${id}`).pipe(
      map((response) => {
        return new User(response.user.id, response.user.first_name, response.user.last_name, response.user.avatar_url, response.user.info, response.user.location)
      })
    );
  }

  public followUser(userId: number) {
    const url = `${baseUrl}${ApiPaths.USER}/${userId}${ApiPaths.FOLLOW}`
    return this.http.post<any>(url, {}, {observe: 'response'}).pipe(
      tap(console.log)
    );
  }

  public unfollowUser(userId: number) {
    const url = `${baseUrl}${ApiPaths.USER}/${userId}${ApiPaths.FOLLOW}`
    return this.http.delete<any>(url, {}).pipe(
      tap(console.log)
    );
  }

  public updateUser(user: User) {
    const url = `${baseUrl}${ApiPaths.USER}/${user.id}`;
    let formData = new FormData();
    formData = this.appendToFormData(formData, user);
  
    console.log(url)
    return this.http.put<any>(url, formData, {observe: 'response'}).pipe(
      map((response) => {
        console.log(response)
        const userResponse = response.body?.user;
        const editedUser = new User(userResponse!.id, userResponse!.first_name, userResponse!.last_name, userResponse!.avatar_url,
          userResponse!.info, userResponse!.location);

        const token = this.authService.getAuthData()?.token;
        const newAuthData: IAuthData = {
          token: token!,
          currentUser: editedUser
        };
        this.authService.saveAuthData(newAuthData);
      })
    )
  }

  public getFollowersOfUser(user: User) {
    const url = `${baseUrl}${ApiPaths.USER}/${user.id}${ApiPaths.USER_FOLLOWERS}`;

    return this.http.get<any>(url).pipe(
      map((response) => {
        return response.followers.map((follower: any) => {
          return new User(follower.user_id, follower.first_name, follower.last_name, follower.avatar_url, follower.info, follower.last_name);
        })
      })
    )
  }

  public getFollowedByUser(user: User) {
    const url = `${baseUrl}${ApiPaths.USER}/${user.id}${ApiPaths.USER_FOLLOWING}`;

    return this.http.get<any>(url).pipe(
      map((response) => {
        return response.followees.map((follower: any) => {
          return new User(follower.user_id, follower.first_name, follower.last_name, follower.avatar_url, follower.info, follower.last_name);
        })
      })
    )
  }

  public isFollowedBy(followerId: number, followeeId: number) {
    const url = `${baseUrl}${ApiPaths.USER}/${followeeId}${ApiPaths.USER_FOLLOWERS}`;
    console.log(url)
    return this.http.get<any>(url).pipe(
      map((response) => {
        debugger;
        console.log(response)
        if (response.followers.length === 0) {
          return false;
        } else {
          const followers = response.followers;
          
          const value = followers.find((followee: { user_id: number; }) => followee.user_id == followerId);
          console.log(value)
          
          if (value) {
            return true
          } else {
            return false;
          }
        }
      })
    );
  }

  public getPostsAndEventsOfFollowees(user: User) {
    const url = `${baseUrl}${ApiPaths.USER}/${user.id}${ApiPaths.USER_FOLLOWING}`;
    const query = `include=posts,events`;
    return this.http.get(`${url}?${query}`).pipe(
      map((response: any) => {
        return response.followees.map((followee: any) => {
          let pe: {
            posts: Post[],
            events: Event[]
          } = {posts: [], events: []}
          pe.posts = followee.posts.map((post: any) => {
            let comments: Comment[] = [];
            comments = post.comments.map((comment: IRawComment) => {
              return new Comment(comment.id, post.id, comment.content, comment.commentatorId, comment.createdAt);
            });
            return new Post(post.id, post.creatorId, post.content, post.imageUrl, post.createdAt, comments);
          });

          pe.events = followee.events.map((event: any) => {
            let coming: User[] = [];
            coming = event.coming.map((user: any) => {
              return new User(user.user_id, user.first_name, user.last_name, user.avatar_url, user.info, user.location.name)
            })
            return new Event(event.id, event.name, event.description, event.startDate, event.endDate, 
              event.startTime, event.address, event.organizatorId, event.location, coming);
            })
          return pe;
        })
      })
    )
  }

  private appendToFormData(fd: FormData, user: User) {
    fd.append("firstName", user.firstName);
    fd.append("lastName", user.lastName);
    fd.append("avatarUrl", user.avatarUrl);
    fd.append("info", user.info);

    return fd;
  }
}
