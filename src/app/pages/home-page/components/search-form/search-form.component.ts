import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {
  @Input() isUsersOnly?: Boolean;
  @Output() search: EventEmitter<any> = new EventEmitter();

  public searchForm: FormGroup = this.fb.group({
    searchQuery: ['', Validators.required],
    table: ['', Validators.required]
  });

  public onSearch() {
    console.log(this.searchForm.value);
    this.search.emit(this.searchForm.value);
  }

  public usersOnly() {
    return Boolean(this.isUsersOnly);
  }

  constructor(private fb: FormBuilder) { }

}
