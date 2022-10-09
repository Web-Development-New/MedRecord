import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterAs } from 'src/app/core/enums/user.enum';
import { IUser } from 'src/app/core/interfaces/user.interface';
import { ApiService } from '../../services/api.service';
import {randomNumber, validateEmail} from 'src/app/core/utils/utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerAs: string = RegisterAs.PATIENT;
  reEnteredPassword: string = '';

  user: IUser = {
    userId: '',
    role: this.registerAs,
    name: '',
    phone: '',
    address: '',
    email: '',
    password: '',
  }
  
  constructor(private apiService: ApiService, private router: Router) { 
    localStorage.getItem('user') && this.router.navigate(['/auth/login']);
  }

  ngOnInit(): void {
  }

  register(): void {
    if(this.isCorrectInputs()){
      if(this.user.password !== this.reEnteredPassword){
        alert('Password does not match');
        return;
      }
      let id = randomNumber();
      this.user.userId = id.toString();
      //TODO: Register user
      let res = this.apiService.registerUser(this.user);
      if(res){
        alert('Registered successfully');
        this.resetInputs();
        this.router.navigate(['/auth/login']);
      }
    }
  }


  isCorrectInputs(): boolean {
    if(this.registerAs !== RegisterAs.PATIENT){
      if(this.user.org === ''){
        alert('Please fill all the fields');
        return false;
      }
    }
    if(this.registerAs === RegisterAs.PATIENT){
      if(this.user.birthDate === ''){
        alert('Please fill all the fields');
        return false;
      }
    }
    if(
      this.user.name === '' ||
      this.user.phone === '' ||
      this.user.address === '' ||
      this.user.email === '' ||
      this.user.password === '' ||
      this.reEnteredPassword === ''
    ){
      alert('Please fill all the fields');
      return false;
    }
    return validateEmail(this.user.email);
  }

  resetInputs(): void {
    this.user = {
      userId: '',
      role: this.registerAs,
      name: '',
      phone: '',
      address: '',
      email: '',
      password: '',
    }
    this.reEnteredPassword = '';
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  get isPatient(): boolean {
    return this.registerAs === RegisterAs.PATIENT;
  }

  get isDoctor(): boolean {
    return this.registerAs === RegisterAs.DOCTOR;
  }
  get isLab(): boolean {
    return this.registerAs === RegisterAs.LAB;
  }

}
