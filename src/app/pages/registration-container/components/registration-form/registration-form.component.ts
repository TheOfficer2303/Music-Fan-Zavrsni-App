import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize, Observable, tap } from 'rxjs';
import { Location } from 'src/app/services/location/location.model';
import { LocationService } from 'src/app/services/location/location.service';
import { samePasswordsValidator } from 'src/app/validators/samePasswords.validator';
import { IUserFormData } from 'src/app/interfaces/userFormData.interface';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationFormComponent {
  @Output() registerUser: EventEmitter<IUserFormData> = new EventEmitter()

  public registration: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    info: ['', Validators.required],
    postNumber: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    passwords: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    },
      {validator: samePasswordsValidator}
    )
  });

  locations$!: Observable<Location[]>;

  constructor(private fb: FormBuilder, private locationService: LocationService) { }

  public onRegister():void {
    this.registerUser.emit({
      user : {
        firstName: this.registration.get('firstName')?.value,
        lastName: this.registration.get('lastName')?.value,
        email: this.registration.get('email')?.value,
        password: this.registration.get(['passwords', 'password'])?.value,
        confirmPassword: this.registration.get(['passwords', 'confirmPassword'])?.value,
        info: this.registration.get('info')?.value,
        postNumber: this.registration.get('postNumber')?.value,
      }
    });
    this.registration.reset();
  }

  ngOnInit() {
    this.locations$ = this.locationService.getLocations().pipe(
      tap(console.log)
    )
  }
}