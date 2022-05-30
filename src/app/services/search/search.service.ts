import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ApiPaths } from 'src/app/enums/ApiPath.enum';
import { Event } from 'src/app/models/event.model';
import { Group } from 'src/app/models/group.model';
import { Orchestra } from 'src/app/models/orchestra.model';
import { User } from 'src/app/models/user.model';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public searchFor(table: string, value: string) {
    const url = `${baseUrl}${ApiPaths.SEARCH}`;
    const query = `${table}=${value}`;

    return this.http.get(`${url}?${query}`).pipe(
      map((response: any) => {
          if (table == "User") {
            return response.resultArray.map((user: any) => {
              return new User(user.id, user.firstName, user.lastName, user.avatarUrl, user.info, "");
            });
          } else if (table == "Group") {
              return response.resultArray.map((group: any) => {
                return new Group(group.id, undefined, group.title, group.type, "", "");
              });
          } else if (table == "Orchestra") {
            return response.resultArray.map((orchestra: any) => {
              return new Orchestra(orchestra.id, undefined, orchestra.name, "", 0, "", "");
            });
          }
      })
    )
  }

  constructor(private http: HttpClient) { }
}
