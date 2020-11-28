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
  //   this.data = [{'name':'Anil', 'anil.singh581@gmail.com' :'ssd', 'age' :'34', 'city':'Noida, UP, India' },
  //   {'name':'Anil', 'email' :'anil.singh581@gmail.com', 'age' :'34', 'city':'Noida' },
  //   {'name':'Sunil', 'email' :'anil.singh581@gmail.com', 'age' :'34', 'city':'Noida' },
  //   {'name':'Alok', 'email' :'anil.singh581@gmail.com', 'age' :'34', 'city':'Noida' },
  //   {'name':'Tinku', 'email' :'anil.singh581@gmail.com', 'age' :'34', 'city':'Noida' },
  //   {'name':'XYZ', 'email' :'anil.singh581@gmail.com', 'age' :'34', 'city':'Noida' },
  //   {'name':'asas', 'email' :'anil.singh581@gmail.com', 'age' :'34', 'city':'Noida' },
  //   {'name':'erer', 'email' :'anil.singh581@gmail.com', 'age' :'34', 'city':'Noida' },
  //   {'name':'jhjh', 'email' :'anil.singh581@gmail.com', 'age' :'34', 'city':'Noida' }
  //  ]


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
