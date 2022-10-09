import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonApiService {

  constructor(private router: Router) { }


  checkUser(role: any){
    let user = localStorage.getItem('user');
    if (user === null) {
      this.router.navigate(['/auth/login']);
    } else {
      let foundUser = JSON.parse(user);
      if(foundUser.role !== role){
        this.router.navigate(['/auth/login']);
      } else{
        return foundUser;
      }
    }
  }

  logoutUser() {
    localStorage.removeItem('user');
    this.router.navigate(['/auth/login']);
  }
}
