import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/services/user/user.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
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

  public followed$ = this.user$?.pipe(
    switchMap((user) => {
      debugger
      return this.userService.isFollowedBy(this.getCurrentUser()!.id, user.id)
    }),
    
  )

  constructor(private authService: AuthService, private userService: UserService, private activatedRoute: ActivatedRoute) { }
 
  public onFollow() {
    console.log("aaa")
  }

  public getCurrentUser() {
    return this.authService.getAuthData()?.currentUser;
  }

  ngOnInit(): void {}

}
