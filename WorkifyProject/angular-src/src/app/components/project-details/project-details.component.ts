import { Component, OnInit,NgZone } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router'
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  
  projectDetails:any;
  tasksOfProject:any;
  taskDetails:any;
  taskDesc:String;
  taskName:String='';
  taskID:any;
  assignee:any;
  taskDue:Date;
  flag: boolean;
  sub: any;
  id: any;//project id
  user: any;
  taskflag: boolean;
  taskDone: boolean;
owner:any;
  showModalCreate: boolean=false;
  showModalEdit: boolean=false;
  constructor(private zone:NgZone,private authService:AuthService, private router:Router,private flashMessage: FlashMessagesService,private _Activatedroute:ActivatedRoute) { }
  getTasks(){
    this.authService.getProjectTasks(this.id).subscribe(taskList => {
      this.tasksOfProject = taskList;
    }, 
    err => {
      console.log(err);
      return false;
    });
   }
  ngOnInit() {
    this.sub=this._Activatedroute.paramMap.subscribe(params => { 
       this.id = params.get('id'); 
       this.authService.getProjectDetails(this.id).subscribe(projectData => {
         this.projectDetails = projectData['project'];
         this.user = projectData['user'];
         if(this.user.email == this.projectDetails.owner.email){
           this.flag = true;
         }else{
           this.flag = false;
         }
      }, 
       err => {
         console.log(err);
         return false;
       });
   });
   
    this.getTasks();
    this.showModalCreate=false;
    this.showModalEdit=false;
  }

  showCreateTask()
  {
    this.showModalCreate = true;
  }
  hideCreateTask()
  {
    this.showModalCreate = false;
  }
  showEditTask(task_id)
  {
    this.showModalEdit = true;
    this.taskID=task_id;
    this.authService.getTaskDetails(this.taskID).subscribe(taskData => {
    this.taskDetails = taskData;
    console.log( this.taskDetails);
  }, 
   err => {
     console.log(err);
     return false;
   });
    
  }
  hideEditTask()
  {
    this.showModalEdit = false;
  }
  months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  onCreateTask() {
    const task={
      project:this.projectDetails,
      taskName:this.taskName,
      taskDesc:this.taskDesc,
      taskDue:this.taskDue,
      assignee:this.assignee,
    }
    console.log(task);
      this.authService.createTask(task).subscribe(data => {
        if(data['success']) {
        this.getTasks();
          this.flashMessage.show('New task created', {cssClass: 'alert-success', timeout: 3000});
        } else {
          this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        }
      });
     }

    
  onEditTask() {
    if(this.taskName == undefined || this.taskName == ""){
      this.taskName = this.taskDetails.taskName
    }
    if(this.taskDesc == undefined || this.taskDesc == ""){
      this.taskDesc = this.taskDetails.taskDesc
    }
    if(this.taskDue == undefined ){
      this.taskDue = this.taskDetails.taskDue
    }
    if(this.assignee == undefined || this.assignee == ""){
      this.assignee = this.taskDetails.assignee
    }
    this.showModalEdit = false;
    if(this.taskDetails.assignee == this.assignee){
      this.flag = true;
    }
  const task={
    _id:this.taskID,
    project:this.projectDetails,
    taskName:this.taskName,
    assignee:this.assignee,
    taskDesc: this.taskDesc,
    taskDue: this.taskDue
  }
    this.authService.editTask(task).subscribe(data => {
      if(data['success']) {
        this.getTasks();
        this.flashMessage.show('Task updated successfully', {cssClass: 'alert-success', timeout: 3000});
      } else {
        this.flashMessage.show('Something went wrong!Try to edit task again', {cssClass: 'alert-danger', timeout: 3000});
      }
    });
    }

    onDeleteTask(task_id) {
      const pid= task_id;
      this.authService.deleteTask(pid).subscribe(data => {
        if(data['success']) {
          this.getTasks();
          this.flashMessage.show('Project deleted', {cssClass: 'alert-success', timeout: 3000});
        } else {
          this.flashMessage.show('You cannot delete this project.. You are not the owner', {cssClass: 'alert-danger', timeout: 3000});
        }
      });
    }

    onCheckTask(task_id){
      const task={
        _id: task_id,
        isDone: this.taskDone,
      }
        this.authService.checkTask(task).subscribe(data => {
          if(data['success']) {
            this.flashMessage.show('Task updated', {cssClass: 'alert-success', timeout: 3000});
            this.getTasks();
          } else {
            this.flashMessage.show('Something went wrong!Try to edit task again', {cssClass: 'alert-danger', timeout: 3000});
          }
        });
    }


}