import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ApiPaths } from 'src/app/enums/ApiPath.enum';
import { ILocationResponse } from 'src/app/interfaces/locationResponse.interface';
import { IRawLocation } from 'src/app/interfaces/rawLocation.interface';
import { baseUrl } from 'src/environments/environment';
import { Location } from '../../models/location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  public getLocations() {
    return this.http.get<ILocationResponse>(`${baseUrl}${ApiPaths.LOCATIONS}`).pipe(
      map((response) => {
        return response.locations.map((location: IRawLocation) => {
          return new Location(location.name, location.post_number, location.country_iso_code);
        })
      })
    )
  }
}
