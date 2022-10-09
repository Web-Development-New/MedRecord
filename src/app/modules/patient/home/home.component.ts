import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { RegisterAs } from 'src/app/core/enums/user.enum';
import { IUser, IUserRecord } from 'src/app/core/interfaces/user.interface';
import { CommonApiService } from 'src/app/core/services/common-api.service';
import { PatientRecordModalComponent } from '../components/patient-record-modal/patient-record-modal.component';
import { PatientApiService } from '../services/patient-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userDetails: IUser| undefined = undefined;

  patientRecords: IUserRecord[] = [];

  constructor(private commonApiService: CommonApiService, private patientApiService: PatientApiService, private modalService: NzModalService) {
    this.userDetails = this.commonApiService.checkUser(RegisterAs.PATIENT);
    this.patientRecords = this.patientApiService.getRecords();
  }

  ngOnInit(): void {
  }

  showModal(data: IUserRecord): void {
    this.modalService.create({
      nzTitle: data.diagnosis,
      nzContent: PatientRecordModalComponent,
      nzComponentParams: {
        patientRecord: data
      },
      nzFooter: null
    });
  }

  logout(): void {
    this.commonApiService.logoutUser();
  }

}
