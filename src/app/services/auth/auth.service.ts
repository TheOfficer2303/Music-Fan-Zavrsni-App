import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiPaths } from 'src/app/enums/ApiPath.enum';
import { IAuthData } from 'src/app/interfaces/authData.interface';
import { ILoginFormData } from 'src/app/interfaces/loginFormData.interface';
import { IUserFormData } from 'src/app/interfaces/userFormData.interface';
import { baseUrl} from 'src/app/enums/ApiPath.enum';
import { StorageService } from '../storage/storage.service';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = baseUrl;

  private _isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(Boolean(this.getAuthData()));
  public isLoggedIn$: Observable<boolean> = this._isLoggedIn$.asObservable();

  constructor(private http: HttpClient, private storageService: StorageService) { }

  public login(data: ILoginFormData) {
    return this.authenticate(data, ApiPaths.LOGIN)
  }

  public register(data: IUserFormData) {
    return this.authenticate(data, ApiPaths.REGISTER);
  }

  private authenticate(data: IUserFormData | ILoginFormData, path: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}${path}`, data, { observe: 'response' }).pipe(
      tap((response: HttpResponse<any>) => {
        const accessToken = response.body['access-token']
        console.log(response, accessToken)

        if (accessToken) {
          const userResponse = response.body['user'];
          const currentUser = new User(
              userResponse.id,
              userResponse.first_name, 
              userResponse.last_name, 
              userResponse.avatar_url,
              userResponse.info,
              userResponse.location
          );

          const authData: IAuthData = {
            token: accessToken,
            currentUser: currentUser
          }

          this.saveAuthData(authData);
          this._isLoggedIn$.next(true);
        }
      })
    )
  }

  public saveAuthData(authData: IAuthData): void {
    this.storageService.add('auth-data', authData);
  }

  public getAuthData(): IAuthData | null {
    return this.storageService.get('auth-data');
  }

  public logOut() {
    this.storageService.delete('auth-data');
    this._isLoggedIn$.next(false);
  }
}
