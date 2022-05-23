import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, combineLatest, map, mergeMap, Observable, of } from 'rxjs';
import { ApiPaths } from 'src/app/enums/ApiPath.enum';
import { IRawOrchestra } from 'src/app/interfaces/rawOrchestra.interface';
import { IRawOrchMemb } from 'src/app/interfaces/rawOrchMemb.interface';
import { baseUrl } from 'src/environments/environment';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { Orchestra, OrchestraMembership } from './orchestra.model';

@Injectable({
  providedIn: 'root'
})
export class OrchestraService {

  public getOrchestraByPlayer(user: User): Observable<OrchestraMembership | null>{
    const url = `${baseUrl}${ApiPaths.ORCHESTRA_MEMBERSHIP}`
    const query = `player_id=${user.id}`
    return this.http.get<IRawOrchMemb>(`${url}?${query}`).pipe(
      mergeMap((response) => {
        return combineLatest([
          of(response), 
          this.userService.getUserById(response.orchMembs.orchestra[0].conductor_id)
        ])
      }),
      map(([response, conductor]) => {
          debugger
          const responseOrchestra = response.orchMembs.orchestra[0];
          const responseMembership = response.orchMembs.membership[0];

          const orchestra = new Orchestra(responseOrchestra.orchestra_id, conductor!, responseOrchestra.name, 
            responseOrchestra.info, responseOrchestra.players_no, responseOrchestra.founded_at, responseOrchestra.country_iso_code);
          return new OrchestraMembership(orchestra, responseMembership.joined_at, responseMembership.instrument, user); 
      }),
      catchError((error) => {
        console.log(error);
        return of(null)
      })
    )
  }



  constructor(private userService: UserService, private http: HttpClient) { }
}
