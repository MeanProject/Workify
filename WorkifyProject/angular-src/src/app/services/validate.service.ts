import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable()
export class ValidateService {
  users: any;

  constructor( private authService:AuthService,
    private router:Router,
    private flashMessage: FlashMessagesService,) { }

  validateRegister(user) {
    if(user.name == undefined || user.email == undefined || user.username == undefined || user.password == undefined) {
        return false;
    } else {
      return true;
    }
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  checkEmailAlreadyExist(email) {
    this.authService.getAllUsers().subscribe(userData => {
      console.log(userData)
      this.users = userData['users'];
      console.log(this.users)
      for(var fetchedUser of this.users){
        console.log(email+" "+fetchedUser['email'])
        if(email==fetchedUser['email']){
          console.log(email+" "+fetchedUser['email'])
          return true;
        }
      }
   }, 
    err => {
      return false;
    });
    return false;
  }

  checkUsernameAlreadyExist(username) {
    this.authService.getAllUsers().subscribe(userData => {
      this.users = userData['usersArr'];
   }, 
    err => {
      return false;
    });
    for(var fetchedUser in this.users){
      if(username==fetchedUser['username']){
        return true;
      }
    }
    return false;
  }

}
