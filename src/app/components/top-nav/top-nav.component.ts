import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppRoles } from 'src/app/consts/roles.constants';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocationService } from 'src/app/services/location/location.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  @Input() currentUser?: User;

  public adminRole = AppRoles.ADMIN;
  public isCollapsed = true;
  public isCollapsed1 = true;

  public countries$ = this.locationService.getCountries();
  public locations$ = this.locationService.getLocations();

  public getCurrentUserProfileLink() {
    return `user/${this.currentUser?.id.toString()}`;
  }

  public openModal(modal: any) {
    this.modalService.open(modal);
  }

  public onNewCountry(country: any) {
    this.locationService.createCountry(country).subscribe(() => {
      this.modalService.dismissAll();
      this.isCollapsed = true;
    });
  }

  public onNewLocation(location: any) {
    this.locationService.createLocation(location).subscribe(() => {
      this.modalService.dismissAll();
      this.isCollapsed1 = true;
    });
  }


  public logOut() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }

  constructor(private authService: AuthService, private router: Router, private modalService: NgbModal,
    private locationService: LocationService) { }

  ngOnInit(): void {
  }

}
