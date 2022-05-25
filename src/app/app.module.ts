import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTabsModule} from '@angular/material/tabs';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { RegistrationContainerComponent } from './pages/registration-container/registration-container.component';
import { RegistrationFormComponent } from './pages/registration-container/components/registration-form/registration-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoginContainerComponent } from './pages/login-container/login-container.component';
import { LoginFormComponent } from './pages/login-container/components/login-form/login-form.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { AvatarComponent } from './pages/user-page/components/avatar/avatar.component';
import { OrchestraMembershipComponent } from './pages/user-page/components/orchestra-membership/orchestra-membership.component';
import { GroupMembershipsComponent } from './pages/user-page/components/group-memberships/group-memberships.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserEditFormComponent } from './pages/user-page/components/user-edit-form/user-edit-form.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { AuthErrorInterceptor } from './interceptors/auth-error.interceptor';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    RegistrationContainerComponent,
    RegistrationFormComponent,
    LoginContainerComponent,
    LoginFormComponent,
    MainLayoutComponent,
    UserPageComponent,
    AvatarComponent,
    OrchestraMembershipComponent,
    GroupMembershipsComponent,
    PostListComponent,
    PostCardComponent,
    UserEditFormComponent,
    TopNavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    HttpClientModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatTabsModule,
    NgbModule,
    MatSnackBarModule,
  ],
  providers: [
    {
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true,
		},
    {
			provide: HTTP_INTERCEPTORS,
			useClass: AuthErrorInterceptor,
			multi: true,
		},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
