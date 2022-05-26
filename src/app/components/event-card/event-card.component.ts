import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent {
  @Input() event?: Event;
  @Input() currentUser?: User;
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter();
  @Output() editEvent: EventEmitter<any> = new EventEmitter();

  public onDelete() {
    this.deleteEvent.emit(this.event?.id);
  }

  constructor() { }
}
