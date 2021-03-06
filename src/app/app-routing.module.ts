import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { AppGuard } from './guards/app.guard';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginContainerComponent } from './pages/login-container/login-container.component';
import { OrchestraPageComponent } from './pages/orchestra-page/orchestra-page.component';
import { RegistrationContainerComponent } from './pages/registration-container/registration-container.component';
import { UserPageComponent } from './pages/user-page/user-page.component';

const routes: Routes = [
  {
  	path: '',
  	component: MainLayoutComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'user/:id', component: UserPageComponent },
      { path: 'my-orchestra', component: OrchestraPageComponent },
    ],
    canActivate: [AppGuard]
  },
  {
  	path: '',
  	component: AuthLayoutComponent,
    children: [
      { path: 'register', component: RegistrationContainerComponent },
      { path: 'login', component: LoginContainerComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 