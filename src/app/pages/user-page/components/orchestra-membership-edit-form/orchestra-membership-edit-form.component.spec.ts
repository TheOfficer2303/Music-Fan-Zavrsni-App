import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrchestraMembershipEditFormComponent } from './orchestra-membership-edit-form.component';

describe('OrchestraMembershipEditFormComponent', () => {
  let component: OrchestraMembershipEditFormComponent;
  let fixture: ComponentFixture<OrchestraMembershipEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrchestraMembershipEditFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrchestraMembershipEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
