import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientRecordModalComponent } from './patient-record-modal.component';

describe('PatientRecordModalComponent', () => {
  let component: PatientRecordModalComponent;
  let fixture: ComponentFixture<PatientRecordModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientRecordModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientRecordModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
