import { HttpErrorResponse } from '@angular/common/http';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { IUserFormData } from 'src/app/interfaces/userFormData.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registration-container',
  templateUrl: './registration-container.component.html',
  styleUrls: ['./registration-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationContainerComponent {
  public isLoading$:Subject<boolean> = new Subject<boolean>()

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  public onRegisterUser(userFormData: IUserFormData) {
    console.log(userFormData)
    this.isLoading$.next(true);
    this.authService.register(userFormData).pipe(
      finalize(() => {
        this.isLoading$.next(false);
      })
    )
    .subscribe((userData: IUserFormData) => {
      this.router.navigate(['']);
    }, (errResponse: HttpErrorResponse) => {
      if (errResponse.status == 400) {
        console.log(errResponse)
        this.snackBar.open(errResponse.error.error, "Close")
      }
      this.router.navigate(['/register']);
    })
  }
}