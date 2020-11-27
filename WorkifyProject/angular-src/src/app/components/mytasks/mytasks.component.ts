import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-mytasks',
  templateUrl: './mytasks.component.html',
  styleUrls: ['./mytasks.component.css']
})
export class MytasksComponent implements OnInit {


  constructor( private authService:AuthService,
    private router:Router,
    private flashMessage: FlashMessagesService,
    private _Activatedroute:ActivatedRoute,) { }
  allTasks:any;
  projectDet:any;
  ngOnInit() {
    this.authService.getAllTasks().subscribe(allTaskData => {
      this.allTasks = allTaskData['allTasks'];
      //this.projectDet=allTaskData['projectArr'];
      console.log(this.allTasks);
      for(var task of this.allTasks){
        console.log(task);
      }
      //this.email = projectData['email']
   }, 
     err => {
       return false;
     });
    
  }

}
