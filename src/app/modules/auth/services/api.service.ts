import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/core/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private router: Router) { }

  registerUser(user: IUser): boolean {
    //TODO: API call to register user
    let users = localStorage.getItem('users');
    if (users) {
      let foundUsers = JSON.parse(users);
      let foundUser = foundUsers.find((u: any) => u.email === user.email);
      if (foundUser) {
        alert('User already exists');
        return false;
      } else {
        foundUsers.push(user);
        localStorage.setItem('users', JSON.stringify(foundUsers));
      }
    } else {
      let foundUsers = [];
      foundUsers.push(user);
      localStorage.setItem('users', JSON.stringify(foundUsers));
    }
    return true;
  }

  loginUser(user: any) {
    //TODO: API call to login user
    let users = localStorage.getItem('users');
    console.log(users);
    if (users) {
      let foundUsers = JSON.parse(users);
      let foundUser = foundUsers.find((u: any) => u.email === user.email);
      if (foundUser) {
        if (foundUser.password === user.password) {
          localStorage.setItem('user', JSON.stringify(foundUser));
          return foundUser;
        } else {
          alert('Incorrect password');
          return false;
        }
      } else {
        alert('User not found');
        return false;
      }
    } else {
      alert('User not found');
      return false;
    }
  }

}
