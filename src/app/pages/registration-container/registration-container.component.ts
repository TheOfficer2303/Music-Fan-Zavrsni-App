import { HttpErrorResponse } from '@angular/common/http';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserFormData } from 'src/app/interfaces/userFormData.interface';

@Component({
  selector: 'app-registration-container',
  templateUrl: './registration-container.component.html',
  styleUrls: ['./registration-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationContainerComponent {
  public isLoading$:Subject<boolean> = new Subject<boolean>()

  constructor(private authService: AuthService, private router: Router) { }

  public onRegisterUser(userFormData: UserFormData) {
    console.log(userFormData)
    this.isLoading$.next(true);
    this.authService.register(userFormData).pipe(
      finalize(() => {
        this.isLoading$.next(false);
      })
    )
    .subscribe((userData: UserFormData) => {
      this.router.navigate(['']);
    }, (errResponse: HttpErrorResponse) => {
      this.router.navigate(['/register'])
    })
  }
}