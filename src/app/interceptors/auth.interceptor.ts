import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let finalRequest: HttpRequest<unknown> = request;

    
    finalRequest = request.clone({
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': "a"
      })
    })  
  

    return next.handle(finalRequest);
  }
}
