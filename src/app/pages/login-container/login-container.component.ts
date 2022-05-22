import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { ILoginFormData } from 'src/app/interfaces/loginFormData.interface';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.scss']
})
export class LoginContainerComponent {

  constructor(private authService: AuthService, private router: Router) { }

  public onLogin(loginData: ILoginFormData) {
    this.authService.login(loginData).pipe(
      finalize(() => {
        
      })
    ).subscribe((loginData) => {
      if (loginData) {
        this.router.navigate(['']);
      }
    })
    
  }

}
