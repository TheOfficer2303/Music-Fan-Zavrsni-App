import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-result-list',
  templateUrl: './search-result-list.component.html',
  styleUrls: ['./search-result-list.component.scss']
})
export class SearchResultListComponent {
  @Input() resultArray?: any

  constructor() { }

  ngOnInit(): void {
    this.resultArray.subscribe(console.log)
  } 

}
