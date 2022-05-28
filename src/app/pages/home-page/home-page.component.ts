import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public postsAndEvents$ = this.userService.getPostsAndEventsOfFollowers(this.authService.getAuthData()?.currentUser!)

  constructor(private authService: AuthService, private userService: UserService) { 
  }

  ngOnInit() {
}

}
