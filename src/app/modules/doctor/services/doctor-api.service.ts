import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUserRecord } from 'src/app/core/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class DoctorApiService {
  constructor(private router: Router) {}

  addNewPatientRecord(patientRecord: IUserRecord) {
    const user = localStorage.getItem('user');
    let docotId = JSON.parse(user || '{}').userId;
    patientRecord.doctorId = docotId;
    patientRecord.date = new Date().toDateString();

    let patientId = patientRecord.patientId;
    let patientRecords = localStorage.getItem('patientRecords');
    if(patientRecords) {
      let parsedpatientRecords = JSON.parse(patientRecords);
      parsedpatientRecords.unshift(patientRecord);
      localStorage.setItem('patientRecords', JSON.stringify(parsedpatientRecords));
      return patientRecord;
    } else {
      let newPatientRecords = [];
      newPatientRecords.push(patientRecord);
      localStorage.setItem('patientRecords', JSON.stringify(newPatientRecords));
      return patientRecord;
    }
  }

  getPatientRecords() {
    let user = localStorage.getItem('user');
    let doctorId = JSON.parse(user || '{}').userId;
    let patientRecords = localStorage.getItem('patientRecords');
    if(patientRecords) {
      let parsedpatientRecords = JSON.parse(patientRecords);
      let filteredPatientRecords = parsedpatientRecords.filter((record: IUserRecord) => record.doctorId === doctorId);
      return filteredPatientRecords;
    } else {
      return [];
    }
  }
  
}
