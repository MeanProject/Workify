import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AuthService } from '../../services/auth.service';
declare var hum: any;

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  projects:Object;
  constructor(  private authService:AuthService) { 
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


  // onHumburgerClick(){
  //   new hum();
  // }  
}
