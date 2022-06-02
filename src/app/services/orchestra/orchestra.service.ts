import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, combineLatest, map, mergeMap, Observable, of } from 'rxjs';
import { ApiPaths } from 'src/app/enums/ApiPath.enum';
import { IRawOrchestra } from 'src/app/interfaces/rawOrchestra.interface';
import { IRawOrchMemb } from 'src/app/interfaces/rawOrchMemb.interface';
import { baseUrl} from 'src/app/enums/ApiPath.enum';
import { User } from '../../models/user.model';
import { UserService } from '../user/user.service';
import { Orchestra, OrchestraMembership } from '../../models/orchestra.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrchestraService {

  public getPlayersOfOrchestra(orchestra: Orchestra) {
    const url = `${baseUrl}${ApiPaths.ORCHESTRA_MEMBERSHIP}`;
    const query = `orchestra_id=${orchestra.id}`;

    return this.http.get(`${url}?${query}`).pipe(
      map((response: any) => {
        return response.orchMembs.map((player: any) => {
          const user = new User(player.player_id, player.first_name, player.last_name, player.avatar_url, "", "", 0);
          return new OrchestraMembership(orchestra, player.joined_at, player.instrument, user);
        })
      })
    )
  }

  public getOrchestraByPlayer(user: User): Observable<OrchestraMembership | null>{
    const url = `${baseUrl}${ApiPaths.ORCHESTRA_MEMBERSHIP}`;
    const query = `player_id=${user.id}`;
    return this.http.get<IRawOrchMemb>(`${url}?${query}`).pipe(
      mergeMap((response) => {
        return combineLatest([
          of(response), 
          this.userService.getUserById(response.orchMembs.orchestra[0].conductor_id)
        ])
      }),
      map(([response, conductor]) => {
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

  public getOrchestraByConductor(conductor: User) {
    const url = `${baseUrl}${ApiPaths.ORCHESTRA}`;
    const query = `conductor_id=${conductor.id}`;

    return this.http.get(`${url}?${query}`).pipe(
      map((response: any) => {
        const resOrch = response.orchestras[0];
        return new Orchestra(resOrch.orchestra_id, this.authService.getAuthData()?.currentUser, resOrch.name, resOrch.info, resOrch.players_no, resOrch.founded_at, resOrch.country_iso_code);
      })
    )
  }

  public createOrchestra(orchestraFormData: any) {
    const url = `${baseUrl}${ApiPaths.ORCHESTRA}`;

    const orchestra = {
      name: orchestraFormData.name,
      info: orchestraFormData.info,
      foundedAt: orchestraFormData.founded,
      conductorId: this.authService.getAuthData()?.currentUser.id,
      countryIsoCode: orchestraFormData.country
    }

    return this.http.post(url, {orchestra});
  }

  public addPlayerToOrchestra(playerId: string, orchestra: Orchestra) {
    const url = `${baseUrl}${ApiPaths.ORCHESTRA_MEMBERSHIP}`;
    const orchestraMembership = {
      orchestraId: orchestra.id,
      playerId: playerId,
      instrument: "",
      joinedAt: "1970-01-01"
    }
    return this.http.post(url, {orchestraMembership});
  }

  public removePlayerFromOrchestra(playerId: number, orchestra: Orchestra) {
    const url = `${baseUrl}${ApiPaths.ORCHESTRA_MEMBERSHIP}/${orchestra.id}/player/${playerId}`;
    return this.http.delete(url);
  }

  public editMembership(formData: any) {
    const url = `${baseUrl}${ApiPaths.ORCHESTRA_MEMBERSHIP}`;
    return this.http.put(url, formData);
  }

  constructor(private userService: UserService, private http: HttpClient, private authService: AuthService) { }
}
