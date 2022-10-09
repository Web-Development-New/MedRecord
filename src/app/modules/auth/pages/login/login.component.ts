import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterAs } from 'src/app/core/enums/user.enum';
import { IUser } from 'src/app/core/interfaces/user.interface';
import { validateEmail } from 'src/app/core/utils/utils';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {
    email: '',
    password: ''
  }
  constructor(private apiService: ApiService, private router: Router) {
    let res = localStorage.getItem('user');
    if(res){
      this.goToDashboard(JSON.parse(res));
    }
  }

  ngOnInit(): void {
  }

  login(){
    if(this.checkInputs()){
      let res = this.apiService.loginUser(this.user);
      if(!res){
        return;
      }
      this.goToDashboard(res);
    } 
  }

  goToDashboard(res: IUser){
    switch(res.role){
      case RegisterAs.PATIENT:
        this.router.navigate(['/patient']);
        break;
      case RegisterAs.DOCTOR:
        this.router.navigate(['/doctor']);
        break;
      case RegisterAs.LAB:
        this.router.navigate(['/lab']);
        break;
      default:
        return;
    }
  }

  checkInputs(){
    if(this.user.email === '' || this.user.password === ''){
      alert('Please fill all the fields');
      return false;
    }
    return validateEmail(this.user.email);
  }

}
