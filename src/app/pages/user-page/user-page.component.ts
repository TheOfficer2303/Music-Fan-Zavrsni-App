import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, combineLatest, finalize, map, mergeMap, Observable, of, switchMap, tap } from 'rxjs';
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
  
  public followTrigger$ = new BehaviorSubject<boolean>(true);
  public userTrigger$ = new BehaviorSubject<boolean>(true);
  public postTrigger$ = new BehaviorSubject<boolean>(true);
  public eventTrigger$ = new BehaviorSubject<boolean>(true);

  public participants$?: Observable<Array<User>>;
  public joined$? = new BehaviorSubject<boolean>(false);

  private id$ = this.activatedRoute.paramMap.pipe(
    map((paramMap) => {
      return paramMap.get('id');
    })
  );

  public user$ = combineLatest([this.id$, this.userTrigger$]).pipe(
    mergeMap(([id]) => {
      return this.getUser(id);
    })
  );

  public followed$ = combineLatest([this.user$, this.postTrigger$]).pipe(
    map(([user]) => {
      return user;
    }),
    switchMap((user) => {
      return this.userService.isFollowedBy(this.getCurrentUser()!.id, user.id)
    })
  );

  public groupMemberships$: Observable<Array<GroupMembership>> = this.user$.pipe(
    switchMap((user) => {
      return this.groupService.getGroupsByUser(user);
    }),
    tap(console.log)
  );

  public orchestraMembership$: Observable<OrchestraMembership | null> = this.user$.pipe(
    switchMap((user) => {
      return this.orchestraService.getOrchestraByPlayer(user);
    })
  );

  public posts$: Observable<Array<Post> | null> = combineLatest([this.user$, this.postTrigger$]).pipe(
    map(([user]) => {
      return user;
    }),
    switchMap((user) => {
      return this.postService.getPostsOfUser(user);
    })
  );

  public events$: Observable<Array<Event>> = combineLatest([this.user$, this.eventTrigger$]).pipe(
    map(([user]) => {
      return user;
    }),
    switchMap((user) => {
      return this.eventService.getEventsOrganizedByUser(user);
    }),
    tap(console.log)
  );

  public followers$ = this.user$.pipe(
    switchMap((user) => {
      return this.userService.getFollowersOfUser(user);
    })
  );

  public followees$ = this.user$.pipe(
    switchMap((user) => {
      return this.userService.getFollowedByUser(user);
    })
  );

  public getUser(id: string | null) {
    return this.userService.getUserById(id!);
  };

  public getCurrentUser(): User | undefined {
    return this.authService.getAuthData()?.currentUser;
  };

 

  public onFollow(): void {
    this.followed$ = of(true);
    this.user$.pipe(
      mergeMap((user) => {
        return this.userService.followUser(user.id);
      })
    ).subscribe()
  };

  public onUnfollow(): void {
    this.followed$ = of(false);
    this.user$.pipe(
      mergeMap((user) => {
        return this.userService.unfollowUser(user.id);
      })
    ).subscribe()
  };

  public openModal(modal: any) {
    this.modalService.open(modal);
  };

  public onEditUser(userEditFormData: IUserEditFormData) {
    this.modalService.dismissAll();
    const currentUser = this.getCurrentUser();
    const userToEdit = new User(currentUser!.id, userEditFormData.user.firstName, userEditFormData.user.lastName,
      currentUser!.avatarUrl, userEditFormData.user.info, currentUser!.location);

    this.userService.updateUser(userToEdit).subscribe(() => {
      this.userTrigger$.next(true);
    });
  };

  public onSavePost(event: any) {
    const post = {
      content: event.content,
      imageUrl: event.imageSource
    }
    this.postService.createPost(post).subscribe(() => {
      this.postTrigger$.next(true);
      this.modalService.dismissAll();
    });
  };

  public onComment(event: any) {
    this.postService.createCommentOnPost(event.postId, event.event.comment)
    .subscribe(() => {
      this.postTrigger$.next(true);
    });
  }

  public onDeletePost(postId: number) {
    this.postService.deletePost(postId).subscribe(() => {
      this.postTrigger$.next(true);
    })
  };

  public onEditPost(postFormData: any) {
    this.postService.editPost(postFormData).subscribe(() => {
      this.postTrigger$.next(true);
      this.modalService.dismissAll();
    });
  }

  public onDeleteEvent(eventId: number) {
    this.eventService.deleteEvent(eventId).subscribe(() => {
      this.eventTrigger$.next(true);
    })
  }

  public onSaveEvent(eventFormData: any) {
    this.eventService.createEvent(eventFormData).subscribe(() => {
      this.eventTrigger$.next(true);
    });
  }

  public onEditEvent(eventFormData: any) {
    this.eventService.editEvent(eventFormData).subscribe(() => {
      this.eventTrigger$.next(true);
    });
  }

  public onJoinEvent(eventId: number) {
    this.eventService.joinEvent(eventId).subscribe(() => {
      this.eventTrigger$.next(true);
      this.joined$?.next(true);
    });
  }

  public onQuitEvent(eventId: number) {
    this.eventService.quitEvent(eventId).subscribe(() => {
      this.eventTrigger$.next(true);
      this.joined$?.next(true);
    });
  }


  constructor(private authService: AuthService, private userService: UserService, private orchestraService: OrchestraService,
    private activatedRoute: ActivatedRoute, private groupService: GroupService,
    private postService: PostService, private modalService: NgbModal, private eventService: EventService) { }
}
