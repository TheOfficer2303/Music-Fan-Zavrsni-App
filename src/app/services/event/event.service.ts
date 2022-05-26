import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ApiPaths } from 'src/app/enums/ApiPath.enum';
import { IEventResponse } from 'src/app/interfaces/rawEvent.interface';
import { Event } from 'src/app/models/event.model';
import { User } from 'src/app/models/user.model';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  public deleteEvent(eventId: number) {
    const url = `${baseUrl}${ApiPaths.EVENTS}/${eventId}`;

    return this.http.delete(url);
  }

  public getEventsOfUser(organizator: User) {
    const url = `${baseUrl}${ApiPaths.EVENTS}`;
    const query = `organizator_id=${organizator.id}`;

    console.log(query)
    
    return this.http.get<IEventResponse>(`${url}?${query}`).pipe(
      map((response) => {
        return response.events.map((event) => {
          console.log(event)
          return new Event(event.id, event.name, event.description, event.startDate, event.endDate, event.startTime, event.address, event.organizatorId, event.location);
        })    
      })
    );
  }

  constructor(private http: HttpClient) { }
}
