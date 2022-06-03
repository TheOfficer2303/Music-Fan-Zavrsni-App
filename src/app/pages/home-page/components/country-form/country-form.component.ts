import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-country-form',
  templateUrl: './country-form.component.html',
  styleUrls: ['./country-form.component.scss']
})
export class CountryFormComponent implements OnInit {
  @Output() country = new EventEmitter();

  public countryForm = this.fb.group({
    'name': ['', Validators.required],
    'isoCode': ['', Validators.required],
  });

  public onSave() {
    this.country.emit(this.countryForm.value);
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
