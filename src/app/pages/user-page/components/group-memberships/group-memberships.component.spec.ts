import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupMembershipsComponent } from './group-memberships.component';

describe('GroupMembershipsComponent', () => {
  let component: GroupMembershipsComponent;
  let fixture: ComponentFixture<GroupMembershipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupMembershipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupMembershipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
