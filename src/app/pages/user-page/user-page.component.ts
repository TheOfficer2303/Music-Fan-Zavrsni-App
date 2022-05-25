import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, finalize, map, Observable, switchMap, tap } from 'rxjs';
import { IUserEditFormData } from 'src/app/interfaces/userEditFormData.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GroupMembership } from 'src/app/services/group/group.model';
import { GroupService } from 'src/app/services/group/group.service';
import { Orchestra, OrchestraMembership } from 'src/app/services/orchestra/orchestra.model';
import { OrchestraService } from 'src/app/services/orchestra/orchestra.service';
import { Post } from 'src/app/services/post/post.model';
import { PostService } from 'src/app/services/post/post.service';
import { User } from 'src/app/services/user/user.model';
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

  public getCurrentUser(): User | undefined {
    return this.authService.getAuthData()?.currentUser;
  }
 
  public onFollow(): void {
    this.followed$.next(true);
    this.user$.pipe(
      switchMap((user) => {
        return this.userService.followUser(user.id);
      })
    ).subscribe()
  }

  public onUnfollow(): void {
    this.followed$.next(false);
    this.user$.pipe(
      switchMap((user) => {
        return this.userService.unfollowUser(user.id);
      })
    ).subscribe()
  }

  public openEditModal(editForm: any) {
    this.modalService.open(editForm);
  }

  public onEditUser(userEditFormData: IUserEditFormData) {
    debugger
    this.modalService.dismissAll();
    const currentUser = this.getCurrentUser();
    const userToEdit = new User(currentUser!.id, userEditFormData.user.firstName, userEditFormData.user.lastName,
      currentUser!.avatarUrl, userEditFormData.user.info, currentUser!.location);

    this.userService.updateUser(userToEdit).subscribe(console.log);
  }

  constructor(private authService: AuthService, private userService: UserService, private orchestraService: OrchestraService,
    private activatedRoute: ActivatedRoute, private groupService: GroupService,
    private postService: PostService, private modalService: NgbModal) { }
}
