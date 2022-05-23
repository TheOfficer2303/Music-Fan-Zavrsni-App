import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrchestraMembershipComponent } from './orchestra-membership.component';

describe('OrchestraMembershipComponent', () => {
  let component: OrchestraMembershipComponent;
  let fixture: ComponentFixture<OrchestraMembershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrchestraMembershipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrchestraMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
