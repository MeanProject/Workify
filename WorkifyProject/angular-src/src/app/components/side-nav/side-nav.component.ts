import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
declare var hum: any;

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  projects:Object;
  constructor(  private authService:AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService) { 
  }

  ngOnInit() {
    console.log("Itnit called");
    this.authService.getProjects().subscribe(projectData => {
    this.projects = projectData;
  }, 
     err => {
       return false;
     });

    //Toggle Click Function
    $("#menu-toggle").on("click", function (e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  }

  onLogoutClick() {
    this.authService.logout();
    this.flashMessage.show('You are logged out', {
      cssClass: 'alert-success', timeout: 3000
    });
    this.router.navigate(['/login']);
    return false;
  }
  // onHumburgerClick(){
  //   new hum();
  // }  
}
