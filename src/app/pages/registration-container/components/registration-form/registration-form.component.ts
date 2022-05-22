import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface UserFormData {
  email: string,
  password: string,
  password_confirmation: string
}

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationFormComponent {
  @Output() registerUser: EventEmitter<UserFormData> = new EventEmitter()

  public registration: FormGroup = this.fb.group({
    firstName: ['', Validators.required, Validators.name],
    lastName: ['', Validators.required, Validators.name],
    info: ['', Validators.required, Validators.name],
    
    email: ['', [Validators.required, Validators.email]],
    passwords: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }
    )
  })

  constructor(private fb: FormBuilder) { }

  public onRegister():void {
    this.registerUser.emit({
      email: this.registration.get("email")?.value,
      password: this.registration.get(['passwords', 'password'])?.value,
      password_confirmation: this.registration.get(['passwords', 'confirmPassword'])?.value
    });
    this.registration.reset();
  }

  
}