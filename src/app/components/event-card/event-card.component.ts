import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { Event } from 'src/app/models/event.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {
  @Input() event?: Event;
  @Input() currentUser?: User;
  @Input() joined$: Observable<boolean> | undefined;
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter();
  @Output() editEvent: EventEmitter<any> = new EventEmitter();
  @Output() joinEvent: EventEmitter<any> = new EventEmitter();
  @Output() quitEvent: EventEmitter<any> = new EventEmitter();

  public isCollapsed = true;

  public onDelete() {
    this.deleteEvent.emit(this.event?.id);
  }

  public onEdit(form: any) {
    this.modalService.open(form)
  }

  public onSave(eventFormData: any) {
    eventFormData.id = this.event?.id;
    this.editEvent.emit(eventFormData)
  }

  public onJoinEvent() {
    this.joinEvent.emit(this.event?.id);
  }

  public onQuitEvent() {
    this.quitEvent.emit(this.event?.id);
  }

  public checkIfJoined(user1: User) {
    if (this.event?.coming.find(user => user.id == user1.id) ) {
      return true;
    }
    return false;
  }

  constructor(private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.joined$ = of(this.checkIfJoined(this.currentUser!));
  }
}
