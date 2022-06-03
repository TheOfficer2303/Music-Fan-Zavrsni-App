import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ILoginFormData } from 'src/app/interfaces/loginFormData.interface';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  @Output() loginUser: EventEmitter<ILoginFormData> = new EventEmitter()

  public loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) { }

  public onLogin(): void {
    this.loginUser.emit({
      user: this.loginForm.value
    });
  }
}
