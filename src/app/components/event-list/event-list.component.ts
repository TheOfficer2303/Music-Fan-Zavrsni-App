import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent {
  @Input() events?: Array<Event> | null;
  @Input() currentUser?: User;
  @Output() comment: EventEmitter<any> = new EventEmitter();
  @Output() deletePost: EventEmitter<any> = new EventEmitter();
  @Output() editPost: EventEmitter<any> = new EventEmitter();

  public onDelete(eventId: any) {
    this.deletePost.emit(eventId);
  }

  constructor() { }
}
