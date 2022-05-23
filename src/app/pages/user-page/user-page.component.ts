import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, finalize, map, switchMap } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent {
  public followed$ = new BehaviorSubject(false)

  private id$ = this.activatedRoute.paramMap.pipe(
    map((paramMap) => {
      return paramMap.get('id');
    })
  );

  public user$ = this.id$.pipe(
    switchMap((id) => {
      return this.getUser(id);
    })
  );

  public getUser(id: string | null) {
    return this.userService.getUserById(id!);
  };

  private _followed$ = this.user$?.pipe(
    switchMap((user) => {
      return this.userService.isFollowedBy(this.getCurrentUser()!.id, user.id)
    }),
  ).subscribe((val: boolean) => {
    this.followed$.next(val)
  })
 
  public onFollow() {
    this.followed$.next(true);
    this.user$.pipe(
      switchMap((user) => {
        return this.userService.followUser(user.id);
      })
    ).subscribe()
  }

  public onUnfollow() {
    this.followed$.next(false);
    this.user$.pipe(
      switchMap((user) => {
        return this.userService.unfollowUser(user.id);
      })
    ).subscribe()
  }

  public getCurrentUser() {
    return this.authService.getAuthData()?.currentUser;
  }

  constructor(private authService: AuthService, private userService: UserService, private activatedRoute: ActivatedRoute) { }
}
