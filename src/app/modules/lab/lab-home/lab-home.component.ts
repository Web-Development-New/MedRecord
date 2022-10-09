import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { RegisterAs } from 'src/app/core/enums/user.enum';
import { IUser, IUserRecord } from 'src/app/core/interfaces/user.interface';
import { CommonApiService } from 'src/app/core/services/common-api.service';
import { PatientRecordModalComponent } from '../components/patient-record-modal/patient-record-modal.component';
import { LabApiService } from '../services/labApi.service';

@Component({
  selector: 'app-lab-home',
  templateUrl: './lab-home.component.html',
  styleUrls: ['./lab-home.component.scss']
})
export class LabHomeComponent implements OnInit {

  userDetails: IUser | undefined = undefined;

  searchValue = '';
  visible = false;
  listOfData: IUserRecord[] = [];
  listOfDisplayData:IUserRecord[] = [];
  isVisible = false;
  isConfirmLoading = false;

  testsRecord: any = {
    patientId: '',
    reports: []
  };

  constructor(private labApiService: LabApiService,private commonApiService: CommonApiService, private modalService: NzModalService) {
    this.userDetails =  this.commonApiService.checkUser(RegisterAs.LAB);
    this.getPatientRecords();
  }

  ngOnInit(): void {
  }

  getPatientRecords(){
    this.listOfData = this.labApiService.getPatientRecords();
    this.listOfDisplayData = [...this.listOfData];
  }

  showDetails(data: IUserRecord){
    this.modalService.create({
      nzTitle: 'Patient Details',
      nzContent: PatientRecordModalComponent,
      nzComponentParams: {
        patientRecord: data
      },
      nzFooter: null
    })
  }

  addTest(){
    this.testsRecord.reports.push({testName: '', testResult: ''});
  }

  getLabTests(data: IUserRecord){
    let labTests = '';
    data.labTests?.reports.forEach((test: any) => {
      labTests += test.testName + ', ';
    }
    );
    labTests = labTests.slice(0, -2);
    return labTests;
  }

  getLabResults(data: IUserRecord){
    let labResults = '';
    data.labTests?.reports.forEach((test: any) => {
      labResults += test.testResult + ', ';
    }
    );
    labResults = labResults.slice(0, -2);
    return labResults;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    if(!this.checkPatientRecordInputs()){
      this.isConfirmLoading = false;
      return;
    }
    this.labApiService.addLabTests(this.testsRecord);
    this.isConfirmLoading = false;
    this.isVisible = false;
    this.getPatientRecords();
    this.resetData();
  }

  checkPatientRecordInputs() {
    if (this.testsRecord.patientId === '') {
      alert('Please enter patient id');
      return false;
    }
    if (this.testsRecord.reports.length === 0) {
      alert('Please add at least one test');
      return false;
    }
    let flag = true;
    this.testsRecord.reports.forEach((test: any) => {
      if (test.testName === '') {
        alert('Please enter test name');
        flag = false;
      }
      if (test.testResult === '') {
        alert('Please enter test result');
        flag = false;
      }
    });
    
    return flag;
  }

  handleCancel(): void {
    this.isVisible = false;
    this.resetData();
  }

  resetData(): void {
    this.testsRecord = {
      patientId: '',
      reports: []
    };
  }

  sortTable = (a: any, b: any) => a.name.localeCompare(b.name)

  showModal(): void {
    this.isVisible = true;
  }
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter((item: any) => item.patientId.indexOf(this.searchValue) !== -1);
  }

  logout(): void {
    this.commonApiService.logoutUser();
  }
}
