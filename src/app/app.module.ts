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


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { RegistrationContainerComponent } from './pages/registration-container/registration-container.component';
import { RegistrationFormComponent } from './pages/registration-container/components/registration-form/registration-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoginContainerComponent } from './pages/login-container/login-container.component';
import { LoginFormComponent } from './pages/login-container/components/login-form/login-form.component';
import { MainLayoutComponent } from './components/main-layout/main-layout/main-layout.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { AvatarComponent } from './pages/user-page/components/avatar/avatar.component';

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
  ],
  providers: [
    {
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true,
		},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
