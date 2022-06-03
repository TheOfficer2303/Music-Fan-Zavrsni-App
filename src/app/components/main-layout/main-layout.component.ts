import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  public getCurrentUser() {
    return this.authService.getAuthData()?.currentUser;
  }

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

}
