import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, combineLatest, map, mergeMap, Observable, of, Subject, switchMap } from 'rxjs';
import { Orchestra, OrchestraMembership } from 'src/app/models/orchestra.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OrchestraService } from 'src/app/services/orchestra/orchestra.service';
import { SearchService } from 'src/app/services/search/search.service';


@Component({
  selector: 'app-orchestra-page',
  templateUrl: './orchestra-page.component.html',
  styleUrls: ['./orchestra-page.component.scss']
})
export class OrchestraPageComponent {
  public orchestra?: Orchestra;
  public players?: Array<User>;
  
  public trigger$ = new BehaviorSubject(true);
  public searchTrigger$ = new Subject();

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
      this.orchestra = orchestra;
      return this.orchestraService.getPlayersOfOrchestra(orchestra);
    })
  );

  public results$ = combineLatest([this.searchTrigger$])
  .pipe(
    map(([event]) => {
      return event
    }),
    switchMap((event: any) => {
      return this.searchService.searchFor("User", event.searchQuery);
    })
  );

  public openModal(form: any) {
    this.modalService.open(form);
  }

  public addPlayer(playerId: string) {
    this.modalService.dismissAll();
    this.orchestraService.addPlayerToOrchestra(playerId, this.orchestra!).subscribe(() => {
      this.snackBar.open("Player added. Please refresh the page!", "Close");
    });
  }

  public onSearch(event: any) {
    this.searchTrigger$.next(event);
  }

  public getCurrentUser() {
    return this.authService.getAuthData()?.currentUser!;
  }


  constructor(private orchestraService: OrchestraService, private authService: AuthService,
    private modalService: NgbModal, private searchService: SearchService, private snackBar: MatSnackBar) { }

}
