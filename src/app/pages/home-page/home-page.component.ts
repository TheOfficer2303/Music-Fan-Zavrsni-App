import { Component } from '@angular/core';
import { BehaviorSubject, combineLatest, map, of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EventService } from 'src/app/services/event/event.service';
import { PostService } from 'src/app/services/post/post.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  public trigger$ = new BehaviorSubject(true);
  public joined$ = new BehaviorSubject(false);

  public postsAndEvents$ = combineLatest([this.trigger$, of(this.getCurrentUser())])
  .pipe(
    map(([, user]) => {
      return user;
    }),
    switchMap((user) => {
      return this.userService.getPostsAndEventsOfFollowees(user);
    })
  ); 

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

  public getCurrentUser() {
    return this.authService.getAuthData()?.currentUser!;
  }

  constructor(private authService: AuthService, private userService: UserService, 
    private postService: PostService, private eventService: EventService) { 
  }
}
