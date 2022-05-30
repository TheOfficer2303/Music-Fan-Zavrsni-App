import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, combineLatest, map, Observable, of, Subject, switchMap } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EventService } from 'src/app/services/event/event.service';
import { OrchestraService } from 'src/app/services/orchestra/orchestra.service';
import { PostService } from 'src/app/services/post/post.service';
import { SearchService } from 'src/app/services/search/search.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  public trigger$ = new BehaviorSubject(true);
  public searchTrigger$ = new Subject();
  public joined$ = new BehaviorSubject(false);
  public searchValue?: string;

  public results$ = combineLatest([this.searchTrigger$])
  .pipe(
    map(([event]) => {
      return event
    }),
    switchMap((event: any) => {
      return this.searchService.searchFor(event.table, event.searchQuery);
    })
  )

  public postsAndEvents$ = combineLatest([this.trigger$, of(this.getCurrentUser())])
  .pipe(
    map(([, user]) => {
      return user;
    }),
    switchMap((user) => {
      return this.userService.getPostsAndEventsOfFollowees(user);
    })
  );

  public openModal(modal: any) {
    this.modalService.open(modal);
  };

  public onComment(event: any) {
    this.postService.createCommentOnPost(event.postId, event.event.comment).subscribe(() => {
      this.trigger$.next(true);
    });
  }

  public onJoinEvent(eventId: number) {
    this.eventService.joinEvent(eventId).subscribe(() => {
      this.trigger$.next(true);
      this.joined$?.next(true);
    });
  }

  public onQuitEvent(eventId: number) {
    this.eventService.quitEvent(eventId).subscribe(() => {
      this.trigger$.next(true);
      this.joined$?.next(true);
    });
  }

  public onNewOrchestra(orchFormData: any) {
    this.orchestraService.createOrchestra(orchFormData).subscribe(() => {
      this.modalService.dismissAll();
      this.router.navigate(['my-orchestra']);
    });
  }

  public onSearch(event: any) {
    this.searchTrigger$.next(event);
  }

  public getCurrentUser() {
    return this.authService.getAuthData()?.currentUser!;
  }

  constructor(private authService: AuthService, private userService: UserService, 
    private postService: PostService, private eventService: EventService, private searchService: SearchService,
    private modalService: NgbModal, private orchestraService: OrchestraService, private router: Router) { 
  }
}
