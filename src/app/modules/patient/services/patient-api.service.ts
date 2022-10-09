import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterAs } from 'src/app/core/enums/user.enum';
import { IUser, IUserRecord } from 'src/app/core/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class PatientApiService {
  constructor(private router: Router) {}

  getRecords() {
    let user = localStorage.getItem('user');
    let patientId = JSON.parse(user || '{}').userId;
    let patientRecords = localStorage.getItem('patientRecords');
    if(patientRecords) {
      let parsedpatientRecords = JSON.parse(patientRecords);
      let filteredPatientRecords = parsedpatientRecords.filter((record: IUserRecord) => record.patientId === patientId);
      return filteredPatientRecords;
    } else {
      return [];
    }
  }

  getPatientFullReport(data: IUserRecord){
    let users = localStorage.getItem('users');
    let parsedUsers = JSON.parse(users || '{}');
    let doctorId = data.doctorId;
    let doctor = parsedUsers.find((user: IUser) => user.userId === doctorId);
    console.log(doctor);
    let fullRecord = {
        ...data,
        doctorName: doctor?.org,
        hospitalName: doctor?.name,
        hospitalAddress: doctor?.address,
        hospitalContact: doctor?.phone,
    }
    console.log(fullRecord);
    return fullRecord;
  }
}
