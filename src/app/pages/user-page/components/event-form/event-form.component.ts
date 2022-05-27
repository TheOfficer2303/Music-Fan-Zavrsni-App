import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Event } from 'src/app/models/event.model';
import { Location } from 'src/app/models/location.model';
import { LocationService } from 'src/app/services/location/location.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EventFormComponent implements OnInit {
  @Input() event?: Event;
  @Output() eventFormData: EventEmitter<any> = new EventEmitter();

  public locations$!: Observable<Location[]>;

  public eventForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    startDate: ['', Validators.required],
    startTime: ['', Validators.required],
    endDate: ['', Validators.required],
    postNumber: ['', Validators.required],
    description: ['', Validators.required],
    address: ['', Validators.required],
  })

  public onSave() {
    this.eventFormData.emit(this.eventForm.value);
  }

  constructor(private fb: FormBuilder, private locationService: LocationService) { }

  ngOnInit(): void {
    if (this.event) {
      console.log(this.event?.startDate.split('T')[0])
      this.eventForm.get('name')?.setValue(this.event?.name);
      this.eventForm.get('startDate')?.setValue(new Date(this.event?.startDate.split('T')[0]));
      this.eventForm.get('endDate')?.setValue(this.event?.endDate);
      this.eventForm.get('description')?.setValue(this.event?.description);
      this.eventForm.get('postNumber')?.setValue(this.event?.location);
      this.eventForm.get('address')?.setValue(this.event?.address);
    }
    this.locations$ = this.locationService.getLocations().pipe()
  }
}
