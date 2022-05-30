import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, map, mergeMap, Observable, of, switchMap } from 'rxjs';
import { Orchestra, OrchestraMembership } from 'src/app/models/orchestra.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OrchestraService } from 'src/app/services/orchestra/orchestra.service';

@Component({
  selector: 'app-orchestra-page',
  templateUrl: './orchestra-page.component.html',
  styleUrls: ['./orchestra-page.component.scss']
})
export class OrchestraPageComponent implements OnInit {
  public orchestra?: Orchestra;
  
  public trigger$ = new BehaviorSubject(true);

  public orchestra$?: Observable<Orchestra> = combineLatest([this.trigger$, of(this.getCurrentUser())])
  .pipe(
    map(([,user]) => {
      return user;
    }),
    switchMap((user: User) => {
      return this.orchestraService.getOrchestraByConductor(user);
    })
  );

  public players$?: Observable<Array<OrchestraMembership>> = this.orchestra$?.pipe(
    mergeMap((orchestra) => {
      return this.orchestraService.getPlayersOfOrchestra(orchestra);
    })
  )

  public addPlayer() {
    this.orchestra$?.pipe(
      map((orchestra) => {
        this.orchestra = orchestra;
      })
    );
    this.orchestraService
  }

  public getCurrentUser() {
    return this.authService.getAuthData()?.currentUser!;
  }

  constructor(private orchestraService: OrchestraService, private authService: AuthService) { }

  ngOnInit(): void {
  }

}
