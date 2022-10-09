import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LabRoutingModule } from './lab-routing.module';
import { LabHomeComponent } from './lab-home/lab-home.component';
import { NzZorroModule } from '../nz-zorrow/nz-zorro.module';
import { FormsModule } from '@angular/forms';
import { PatientRecordModalComponent } from './components/patient-record-modal/patient-record-modal.component';


@NgModule({
  declarations: [
    LabHomeComponent,
    PatientRecordModalComponent
  ],
  imports: [
    CommonModule,
    LabRoutingModule,
    NzZorroModule,
    FormsModule
  ]
})
export class LabModule { }
