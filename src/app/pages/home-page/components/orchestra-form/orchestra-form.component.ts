import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Country } from 'src/app/models/country.model';
import { LocationService } from 'src/app/services/location/location.service';

@Component({
  selector: 'app-orchestra-form',
  templateUrl: './orchestra-form.component.html',
  styleUrls: ['./orchestra-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OrchestraFormComponent implements OnInit {
  @Output() orchestraFormData = new EventEmitter();

  public countries$?: Observable<Array<Country>>;

  public orchestraForm = this.fb.group({
    name: ['', Validators.required],
    info: ['', Validators.required],
    founded: ['', Validators.required],
    country: ['', Validators.required],
  })

  public onSave() {
    this.orchestraFormData?.emit(this.orchestraForm.value);
  }

  constructor(private fb: FormBuilder, private locationService: LocationService) { }

  ngOnInit(): void {
    this.countries$ = this.locationService.getCountries();
  }

}
