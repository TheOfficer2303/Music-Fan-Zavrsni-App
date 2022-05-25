import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private snackBar: MatSnackBar) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((errResponse: HttpErrorResponse) => {
        if (errResponse.status === 401 || errResponse.status === 403) {
          this.snackBar.open(errResponse.error.error, 'Close', {
            duration: 3500
          })
          this.router.navigate(['/login']);
          return EMPTY;
        } 
        return throwError(errResponse);
      })
    );
  }
}