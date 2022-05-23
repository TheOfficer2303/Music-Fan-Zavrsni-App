import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, finalize, map, Observable, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GroupMembership } from 'src/app/services/group/group.model';
import { GroupService } from 'src/app/services/group/group.service';
import { Orchestra, OrchestraMembership } from 'src/app/services/orchestra/orchestra.model';
import { OrchestraService } from 'src/app/services/orchestra/orchestra.service';
import { Post } from 'src/app/services/post/post.model';
import { PostService } from 'src/app/services/post/post.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent {
  public followed$ = new BehaviorSubject(false);

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

  public groupMemberships$: Observable<Array<GroupMembership>> = this.user$.pipe(
    switchMap((user) => {
      return this.groupService.getGroupsByUser(user);
    }),
    tap(console.log)
  );

  public posts$: Observable<Array<Post>> = this.user$.pipe(
    switchMap((user) => {
      return this.postService.getPostsOfUser(user);
    })
  )

  public orchestraMembership$: Observable<OrchestraMembership | null> = this.user$.pipe(
    switchMap((user) => {
      return this.orchestraService.getOrchestraByPlayer(user);
    })
  );

  
  public getUser(id: string | null) {
    return this.userService.getUserById(id!);
  };
 
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

  constructor(private authService: AuthService, private userService: UserService, private orchestraService: OrchestraService,
    private activatedRoute: ActivatedRoute, private groupService: GroupService,
    private postService: PostService) { }
}
