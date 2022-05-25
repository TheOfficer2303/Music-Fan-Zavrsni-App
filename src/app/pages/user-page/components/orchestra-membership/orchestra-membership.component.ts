import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrchestraMembership } from 'src/app/models/orchestra.model';

@Component({
  selector: 'app-orchestra-membership',
  templateUrl: './orchestra-membership.component.html',
  styleUrls: ['./orchestra-membership.component.scss']
})
export class OrchestraMembershipComponent implements OnInit {
  @Input() orchestraMembership?: OrchestraMembership | null;

  constructor() { }

  ngOnInit(): void {
  }

}
