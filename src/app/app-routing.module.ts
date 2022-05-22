import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { RegistrationContainerComponent } from './pages/registration-container/registration-container.component';

const routes: Routes = [
  {
  	path: '',
  	component: AuthLayoutComponent,
    children: [
      { path: 'register', component: RegistrationContainerComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 