import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-search-result-list',
  templateUrl: './search-result-list.component.html',
  styleUrls: ['./search-result-list.component.scss']
})
export class SearchResultListComponent {
  @Input() resultArray?: any
  @Input() isSelectable?: Boolean
  @Output() personId = new EventEmitter();

  constructor() { }

  selectPerson(personId: any) {
    console.log(personId);
    this.personId.emit(personId);
  }

}
