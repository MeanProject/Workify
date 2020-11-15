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


  // onHumburgerClick(){
  //   new hum();
  // }  
}
