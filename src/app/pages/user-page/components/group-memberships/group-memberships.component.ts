import { Component, Input } from '@angular/core';
import { GroupMembership } from 'src/app/models/group.model';

@Component({
  selector: 'app-group-memberships',
  templateUrl: './group-memberships.component.html',
  styleUrls: ['./group-memberships.component.scss']
})
export class GroupMembershipsComponent {
  @Input() groupMemberships?: Array<GroupMembership>;

  constructor() { }

}
