import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ApiPaths } from 'src/app/enums/ApiPath.enum';
import { IRawGroupMemb } from 'src/app/interfaces/rawGroupMemb.interface';
import { baseUrl } from 'src/environments/environment';
import { User } from '../user/user.model';
import { Group, GroupMembership } from './group.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  public getGroupsByUser(user: User) {
    const url = `${baseUrl}${ApiPaths.GROUP_MEMBERSHIP}`;
    const query = `member_id=${user.id}`;

    return this.http.get<IRawGroupMemb>(`${url}?${query}`).pipe(
      map((response) => {
        return response.groupMembs.map((groupMemb) => {
          const group = new Group(groupMemb.group_id, undefined, groupMemb.title, groupMemb.type, groupMemb.created_at, groupMemb.info);
          return new GroupMembership(group, user, groupMemb.role);
        })
      })
    );
  }

  constructor(private http: HttpClient) { }
}
