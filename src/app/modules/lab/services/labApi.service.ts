import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUserRecord } from 'src/app/core/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class LabApiService {
  constructor(private router: Router) {}

  getPatientRecords() {
    let user = localStorage.getItem('user');
    let labId = JSON.parse(user || '{}').userId;
    let patientRecords = localStorage.getItem('patientRecords');
    if(patientRecords) {
      let parsedpatientRecords = JSON.parse(patientRecords);
      let filteredPatientRecords = parsedpatientRecords.filter((record: IUserRecord) => record.labTests?.labId === labId);
      return filteredPatientRecords;
    } else {
      return [];
    }
  }

  addLabTests(tests: any){
    let user = localStorage.getItem('user');
    let labId = JSON.parse(user || '{}').userId;
    let patientRecords = localStorage.getItem('patientRecords');
    if(patientRecords) {
      let parsedpatientRecords = JSON.parse(patientRecords);
      let filteredPatientRecords = parsedpatientRecords.filter((record: IUserRecord) => record.patientId === tests.patientId);
      filteredPatientRecords[0].labTests = {
        labId,
        reports: tests.reports,
        date: new Date()
      }
      localStorage.setItem('patientRecords', JSON.stringify(parsedpatientRecords));
    }
  }
}
