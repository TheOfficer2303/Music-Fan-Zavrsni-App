import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ILocationResponse } from 'src/app/interfaces/locationResponse.interface';
import { IRawLocation } from 'src/app/interfaces/rawLocation.interface';
import { Location } from './location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  public getLocations() {
    return this.http.get<ILocationResponse>('localhost:3000/locations').pipe(
      map((response) => {
        return response.locations.map((location: IRawLocation) => {
          return new Location(location.name, location.post_number, location.country_iso_code);
        })
      })
    )
  }
}
