import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { IUserEditFormData } from 'src/app/interfaces/userEditFormData.interface';
import { Location } from 'src/app/models/location.model';
import { LocationService } from 'src/app/services/location/location.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-edit-form',
  templateUrl: './user-edit-form.component.html',
  styleUrls: ['./user-edit-form.component.scss']
})
export class UserEditFormComponent {
  @Input() user?: User;
  @Output() editUser: EventEmitter<IUserEditFormData> = new EventEmitter()

  public edit: FormGroup = this.fb.group({
    firstName: ['' , Validators.required],
    lastName: ['', Validators.required],
    info: ['', Validators.required],
    image: ['', Validators.required],
    imageSource: ['']
  });

  locations$!: Observable<Location[]>;

  constructor(private fb: FormBuilder) { }

  public onEdit():void {
    this.editUser.emit({
      user: this.edit.value
    });
    this.edit.reset();
  }

  public onChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.edit.patchValue({
        imageSource: file
      });
    }
  }

  ngOnInit() {
    this.edit.get('info')?.setValue(this.user?.info);
    console.log(this.edit.get('info')?.value, this.user)
    this.edit.get('firstName')?.setValue(this.user?.firstName);
    this.edit.get('lastName')?.setValue(this.user?.lastName);
  }
}