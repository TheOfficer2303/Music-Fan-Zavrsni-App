import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Location } from 'src/app/models/location.model';
import { LocationService } from 'src/app/services/location/location.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EventFormComponent implements OnInit {
  @Output() eventFormData: EventEmitter<any> = new EventEmitter();

  public locations$!: Observable<Location[]>;

  public event: FormGroup = this.fb.group({
    name: ['', Validators.required],
    startDate: ['', Validators.required],
    startTime: ['', Validators.required],
    endDate: ['', Validators.required],
    postNumber: ['', Validators.required],
    description: ['', Validators.required],
    address: ['', Validators.required],
  })

  public onSave() {
    this.eventFormData.emit(this.event.value);
    console.log(this.event.value)
  }

  constructor(private fb: FormBuilder, private locationService: LocationService) { }

  ngOnInit(): void {
    this.locations$ = this.locationService.getLocations().pipe()
  }
}
