import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { ApiPaths } from 'src/app/enums/ApiPath.enum';
import { IAuthData } from 'src/app/interfaces/authData.interface';
import { IRawUser } from 'src/app/interfaces/rawUser.interface';
import { baseUrl } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { User } from './user.model';

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
    console.log(url)
    return this.http.put<any>(url, {user: user}, {observe: 'response'}).pipe(
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

  public isFollowedBy(followerId: number, followeeId: number) {
    const url = `${baseUrl}${ApiPaths.USER}/${followerId}${ApiPaths.USER_FOLLOWING}`
    console.log(url)
    return this.http.get<any>(url).pipe(
      map((response) => {
        console.log(response)
        if (response.followees.length === 0) {
          return false;
        } else {
          const followees = response.followees;
          
          const value = followees.find((followee: { user_id: number; }) => followee.user_id == followeeId);
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
}
