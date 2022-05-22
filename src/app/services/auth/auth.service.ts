import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiPaths } from 'src/app/enums/ApiPath.enum';
import { UserFormData } from 'src/app/interfaces/userFormData.interface';
import { baseUrl } from 'src/environments/environment';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = baseUrl;

  private _isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(Boolean(this.getToken()));
  public isLoggedIn$: Observable<boolean> = this._isLoggedIn$.asObservable();

  constructor(private http: HttpClient, private storageService: StorageService) { }

  public register(data: UserFormData) {
    return this.authenticate(data, ApiPaths.REGISTER);
  }

  private authenticate(data: UserFormData, path: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}${path}`, data, { observe: 'response' }).pipe(
      tap((response: HttpResponse<any>) => {
        const accessToken = response.headers.get('access-token');

        if (accessToken) {
          this.saveToken(accessToken);
          this._isLoggedIn$.next(true);
        }
      })
    )
  }

  private saveToken(token: string): void {
    this.storageService.add('access-token', token)
  }

  private getToken(): string | null {
    return this.storageService.get('access-token');
  }

  public logOut() {
    this.storageService.delete('access-token');
    this._isLoggedIn$.next(false);
  }
}
