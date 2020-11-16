import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  
  showModal: boolean;
  content: string;
  title: string;
  //Bootstrap Modal Open event
  show()
  {
    this.showModal = true; // Show-Hide Modal Check
    this.content = "This is content!!"; // Dynamic Data
    this.title = "This is title!!";    // Dynamic Data
  }
  //Bootstrap Modal Close event
  hide()
  {
    this.showModal = false;
  }
  
}
