import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrchestraFormComponent } from './orchestra-form.component';

describe('OrchestraFormComponent', () => {
  let component: OrchestraFormComponent;
  let fixture: ComponentFixture<OrchestraFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrchestraFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrchestraFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
