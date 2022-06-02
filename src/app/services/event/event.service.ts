import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ApiPaths } from 'src/app/enums/ApiPath.enum';
import { IEventResponse } from 'src/app/interfaces/rawEvent.interface';
import { Event, EventSubscription } from 'src/app/models/event.model';
import { User } from 'src/app/models/user.model';
import { baseUrl} from 'src/app/enums/ApiPath.enum';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  public deleteEvent(eventId: number) {
    const url = `${baseUrl}${ApiPaths.EVENTS}/${eventId}`;

    return this.http.delete(url);
  }

  public createEvent(eventFormData: any) {
    const url = `${baseUrl}${ApiPaths.EVENTS}`;
    eventFormData.startTime = `${eventFormData.startDate} ${eventFormData.startTime}`;

    return this.http.post(url, {event: eventFormData})
  }

  public editEvent(eventFormData: any) {
    const url = `${baseUrl}${ApiPaths.EVENTS}/${eventFormData.id}`;
    eventFormData.startTime = `${eventFormData.startDate} ${eventFormData.startTime}`;

    return this.http.put(url, {event: eventFormData})
  }

  public joinEvent(eventId: number) {
    const url = `${baseUrl}${ApiPaths.EVENT_SUBSCRIPTION}`;

    return this.http.post(url, {eventId: eventId});
  }

  public quitEvent(eventId: number) {
    const url = `${baseUrl}${ApiPaths.EVENT_SUBSCRIPTION}/${eventId}`;

    return this.http.delete(url);
  }

  public getEventsOrganizedByUser(organizator: User) {
    const url = `${baseUrl}${ApiPaths.EVENTS}`;
    const query = `organizator_id=${organizator.id}`;
    
    return this.http.get<IEventResponse>(`${url}?${query}`).pipe(
      map((response) => {
        return response.events.map((event) => {
          let coming: User[] = [];
          coming = event.coming.map((user: any) => {
            return new User(user.user_id, user.first_name, user.last_name, user.avatar_url, user.info, user.location.name)
          })
          return new Event(event.id, event.name, event.description, event.startDate, event.endDate, 
            event.startTime, event.address, event.organizatorId, event.location, coming);
        })    
      })
    );
  }

  public getEventSubsByEventId(eventId: number) {
    const url = `${baseUrl}${ApiPaths.EVENT_SUBSCRIPTION}`;
    const query = `event_id=${eventId}`;

    return this.http.get(`${url}?${query}`).pipe(
      map((response: any) => {
        return response.eventSubs.map((user: any) => {
          return new User(
            user.user_id,
            user.first_name,
            user.last_name,
            user.avatar_url,
            user.info,
            user.location.name
          )
        })
      })
    );
  }

  constructor(private http: HttpClient) { }
}
