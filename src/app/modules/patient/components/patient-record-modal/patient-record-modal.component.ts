import { Component, Input, OnInit } from '@angular/core';
import { PatientApiService } from '../../services/patient-api.service';

@Component({
  selector: 'app-patient-record-modal',
  templateUrl: './patient-record-modal.component.html',
  styleUrls: ['./patient-record-modal.component.scss']
})
export class PatientRecordModalComponent implements OnInit {

  @Input() patientRecord: any;
  patientFullRecord: any = {};

  constructor(private apiService: PatientApiService) { }

  ngOnInit(): void {
    this.patientFullRecord =  this.apiService.getPatientFullReport(this.patientRecord);
  }

}
