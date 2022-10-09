import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { RegisterAs } from 'src/app/core/enums/user.enum';
import { IUser, IUserRecord } from 'src/app/core/interfaces/user.interface';
import { CommonApiService } from 'src/app/core/services/common-api.service';
import { PatientRecordModalComponent } from '../components/patient-record-modal/patient-record-modal.component';
import { DoctorApiService } from '../services/doctor-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  patientRecord: IUserRecord = {
    patientId: '',
    patientName: '',
    doctorId: '',
    symptoms: '',
    diagnosis: '',
    prescription: '',
    status: '',
    date: ''
  }


  userDetails: IUser | undefined = undefined;
  
  searchValue = '';
  visible = false;
  listOfData: IUserRecord[] = [];
  listOfDisplayData:IUserRecord[] = [];
  
  isVisible = false;
  isConfirmLoading = false;

  constructor(private commonApiService: CommonApiService, private doctorApiService: DoctorApiService, private modalService: NzModalService) {

    this.userDetails =  this.commonApiService.checkUser(RegisterAs.DOCTOR);
    this.listOfData = this.doctorApiService.getPatientRecords();
    this.listOfDisplayData = [...this.listOfData];

  }

  ngOnInit(): void {
  }


  showDetails(data: IUserRecord){
    this.modalService.create({
      nzTitle: 'Patient Record',
      nzContent: PatientRecordModalComponent,
      nzComponentParams: {
        patientRecord: data
      },
      nzFooter: null
    });
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter((item: any) => item.patientId.indexOf(this.searchValue) !== -1);
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    if(!this.checkPatientRecordInputs()) {
      this.isConfirmLoading = false;
      return;
    };
    let newPatientRecord = this.doctorApiService.addNewPatientRecord(this.patientRecord);
    this.isConfirmLoading = false;
    this.isVisible = false;
    this.listOfData = [...this.listOfData, newPatientRecord];
    this.listOfDisplayData = [...this.listOfData];
    alert('Patient Record Added Successfully');
  }

  checkPatientRecordInputs() {
    if(this.patientRecord.patientId === '' || this.patientRecord.patientName === '' || this.patientRecord.symptoms === '' || this.patientRecord.diagnosis === '' || this.patientRecord.prescription === '' || this.patientRecord.status === '') { 
      alert('Please fill all the fields');
      return false;
    }
    return true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  logout() {
    this.commonApiService.logoutUser();
  }
  

}
