import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
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
  @Input() joined$: Observable<boolean> | undefined;
  @Input() adminRole?: number;
  
  @Output() comment: EventEmitter<any> = new EventEmitter();
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter();
  @Output() editEvent: EventEmitter<any> = new EventEmitter();
  @Output() joinEventId: EventEmitter<number> = new EventEmitter();
  @Output() quitEventId: EventEmitter<number> = new EventEmitter();

  public onDelete(eventId: any) {
    this.deleteEvent.emit(eventId);
  }

  public onEdit(eventFormData: any) {
    this.editEvent.emit(eventFormData);
  }

  public onJoinEvent(id: number) {
    this.joinEventId.emit(id);
  }

  public onQuitEvent(id: number) {
    this.quitEventId.emit(id);
  }

  constructor() {
   }
}
