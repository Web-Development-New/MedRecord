import { Component, Input, OnInit } from '@angular/core';
import { IUserRecord } from 'src/app/core/interfaces/user.interface';

@Component({
  selector: 'app-patient-record-modal',
  templateUrl: './patient-record-modal.component.html',
  styleUrls: ['./patient-record-modal.component.scss']
})
export class PatientRecordModalComponent implements OnInit {

  @Input() patientRecord: IUserRecord | undefined = undefined;

  labRecords: any[] = [
    {
      reportName: 'Blood Test',
      reportResult: 'Normal',
      date: '12/12/2020',
    },
  ];

  constructor() {
  }

  ngOnInit(): void {
    this.labRecords = this.patientRecord?.labTests?.reports || [];
  }

}
