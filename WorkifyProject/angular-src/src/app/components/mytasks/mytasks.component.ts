import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import {DataTableModule} from "angular-6-datatable";
import sorter from 'sort-nested-json';

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
    allTaskData:any;
    projectDet:any;
    taskName:String;
    data:any;
  ngOnInit() {
    this.authService.getAllTasks().subscribe(allTaskData => {
      this.allTaskData = allTaskData['allTasks'];
      this.allTaskData = sorter.sort(this.allTaskData).asc("task.dueDate")
      console.log(this.allTaskData);
      for(var task of this.allTaskData){
        console.log(task);
      }
   }, 
     err => {
       return false;
     });    
  }

}
