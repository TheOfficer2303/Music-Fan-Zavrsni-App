import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/services/auth/user.model';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  public person: User | undefined

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.person = this.authService.getAuthData()?.currentUser;
  }

}
