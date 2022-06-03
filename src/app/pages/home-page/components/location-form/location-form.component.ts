import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Country } from 'src/app/models/country.model';
import { LocationService } from 'src/app/services/location/location.service';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LocationFormComponent implements OnInit {
  @Output() location = new EventEmitter();

  public locationForm = this.fb.group({
    'name': ['', Validators.required],
    'countryIsoCode': ['', Validators.required],
    'postNumber': ['', Validators.required],
  })

  public countries$?: Observable<Array<Country>>;

  public onSave() {
    this.location.emit(this.locationForm.value);
  }

  constructor(private locationService: LocationService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.countries$ = this.locationService.getCountries();
  }

}
