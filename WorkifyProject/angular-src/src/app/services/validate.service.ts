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

    ngInit(){
    }

  async allUsers(){
    await this.authService.getAllUsers().subscribe(userData => {
      this.users = userData['users'];
      console.log(this.users)
   }, 
    err => {
      console.log(err);
    });
  }

  validateRegister(user) {
    if(user.name == undefined || user.email == undefined || user.username == undefined || user.password == undefined) {
      return false;
    } else {
      console.log(this.users)
      return true;
    }
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  flag1:any;
   checkEmailAlreadyExist(email) {
    this.flag1=0;
    console.log(this.users);
    for(var fetchedUser of this.users){
      console.log(email+" "+fetchedUser['email'])
      if(email==fetchedUser['email']){
        console.log(email+" "+fetchedUser['email'])
        this.flag1=1;
      }
    }
    if(this.flag1==1){
      return true;
    }
    else{
      return false;
    }
  }


  flag2:any;
  checkUsernameAlreadyExist(email) {
   this.flag2=0;
   console.log(this.users);
   for(var fetchedUser of this.users){
     console.log(email+" "+fetchedUser['username'])
     if(email==fetchedUser['username']){
       console.log(email+" "+fetchedUser['username'])
       this.flag2=1;
     }
   }
   if(this.flag2==1){
     return true;
   }
   else{
     return false;
   }
 }

  

}
