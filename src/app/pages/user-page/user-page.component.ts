import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, combineLatest, finalize, map, Observable, switchMap, tap } from 'rxjs';
import { IUserEditFormData } from 'src/app/interfaces/userEditFormData.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GroupMembership } from 'src/app/models/group.model';
import { GroupService } from 'src/app/services/group/group.service';
import { Orchestra, OrchestraMembership } from 'src/app/models/orchestra.model';
import { OrchestraService } from 'src/app/services/orchestra/orchestra.service';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post/post.service';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';
import { Event } from 'src/app/models/event.model';
import { EventService } from 'src/app/services/event/event.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent {
  public isCollapsed = true;
  public followed$ = new BehaviorSubject(false);
  public trigger$ = new BehaviorSubject<boolean>(true);

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


  public posts$: Observable<Array<Post>> = combineLatest([this.user$, this.trigger$]).pipe(
    map(([user]) => {
      return user;
    }),
    switchMap((user) => {
      return this.postService.getPostsOfUser(user);
    })
  );

  public events$: Observable<Array<Event>> = combineLatest([this.user$, this.trigger$]).pipe(
    map(([user]) => {
      return user;
    }),
    switchMap((user) => {
      return this.eventService.getEventsOfUser(user);
    })
  );

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
  };
 
  public onFollow(): void {
    this.followed$.next(true);
    this.user$.pipe(
      switchMap((user) => {
        return this.userService.followUser(user.id);
      })
    ).subscribe()
  };

  public onUnfollow(): void {
    this.followed$.next(false);
    this.user$.pipe(
      switchMap((user) => {
        return this.userService.unfollowUser(user.id);
      })
    ).subscribe()
  };

  public openEditModal(editForm: any) {
    this.modalService.open(editForm);
  };

  public onEditUser(userEditFormData: IUserEditFormData) {
    debugger
    this.modalService.dismissAll();
    const currentUser = this.getCurrentUser();
    const userToEdit = new User(currentUser!.id, userEditFormData.user.firstName, userEditFormData.user.lastName,
      currentUser!.avatarUrl, userEditFormData.user.info, currentUser!.location);

    this.userService.updateUser(userToEdit).subscribe(console.log);
  };

  public onSavePost(event: any) {
    console.log(event);
    const post = {
      content: event.content,
      imageUrl: event.imageSource
    }
    console.log(post)
    this.postService.createPost(post).subscribe(() => {
      this.trigger$.next(true);
    });
  };

  public onComment(event: any) {
    this.postService.createCommentOnPost(event.postId, event.event.comment)
    .subscribe(() => {
      this.trigger$.next(true);
    });
  }

  public onDeletePost(postId: number) {
    this.postService.deletePost(postId).subscribe(() => {
      this.trigger$.next(true);
    })
  };

  public onEditPost(postFormData: any) {
    this.postService.editPost(postFormData).subscribe(() => {
      this.trigger$.next(true);
      this.modalService.dismissAll();
    });
  }

  public onDeleteEvent(eventId: number) {
    this.eventService.deleteEvent(eventId).subscribe(() => {
      this.trigger$.next(true);
    })
  }


  constructor(private authService: AuthService, private userService: UserService, private orchestraService: OrchestraService,
    private activatedRoute: ActivatedRoute, private groupService: GroupService,
    private postService: PostService, private modalService: NgbModal, private eventService: EventService) { }
}
