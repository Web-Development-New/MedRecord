import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { HomeComponent } from './home/home.component';
import { NzZorroModule } from '../nz-zorrow/nz-zorro.module';
import { PatientRecordModalComponent } from './components/patient-record-modal/patient-record-modal.component';


@NgModule({
  declarations: [
    HomeComponent,
    PatientRecordModalComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    NzZorroModule
  ]
})
export class PatientModule { }
