import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
declare var hum: any;

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    //Toggle Click Function
    $("#menu-toggle").on("click", function (e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  }

  toggleMenu() {
    let sideNav = document.querySelector(".side");
    sideNav.classList.add("invisibile");

    let hamburger = document.querySelector(".hamburger-top-menu");
    hamburger.classList.add("hamburger-visible");

    let rightSide = document.querySelector(".right");
    rightSide.classList.add("no-side");

    let rightSideRight = document.querySelector(".right-top");
    rightSideRight.classList.add("right-top-visibile");
  };
  // onHumburgerClick(){
  //   new hum();
  // }  
}
