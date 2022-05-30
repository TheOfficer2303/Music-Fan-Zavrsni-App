import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {
  @Output() search: EventEmitter<any> = new EventEmitter();

  public searchForm: FormGroup = this.fb.group({
    searchQuery: ['', Validators.required],
    table: ['', Validators.required]
  });

  public onSearch() {
    console.log(this.searchForm.value);
    this.search.emit(this.searchForm.value);
  }

  constructor(private fb: FormBuilder) { }

}
