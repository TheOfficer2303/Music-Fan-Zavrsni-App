import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  public getCurrentUserProfileLink() {
    return `user/${this.authService.getAuthData()?.currentUser.id.toString()}`;
  }

  public logOut() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

}
