import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { HomeComponent } from './home/home.component';
import { NzZorroModule } from '../nz-zorrow/nz-zorro.module';
import { FormsModule } from '@angular/forms';
import { PatientRecordModalComponent } from './components/patient-record-modal/patient-record-modal.component';


@NgModule({
  declarations: [
    HomeComponent,
    PatientRecordModalComponent
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    FormsModule,
    NzZorroModule,
  ]
})
export class DoctorModule { }
