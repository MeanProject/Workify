import { Component, OnInit } from '@angular/core';
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
  taskName:any;
  taskID:any;
  assignee:any;
  monthDue:any;
  dayDue:any;
  dateDue:any;
  sub: any;
  id: any;//project id

  showModalCreate: boolean=false;
  showModalEdit: boolean=false;
  constructor(private authService:AuthService, private router:Router,private flashMessage: FlashMessagesService,private _Activatedroute:ActivatedRoute) { }

  ngOnInit() {
    this.sub=this._Activatedroute.paramMap.subscribe(params => { 
       this.id = params.get('id'); 
       this.authService.getProjectDetails(this.id).subscribe(projectData => {
         this.projectDetails = projectData;
         //console.log("details"+this.projectDetails['_id']);
      }, 
       err => {
         console.log(err);
         return false;
       });
   });
   
    this.authService.getProjectTasks(this.id).subscribe(taskList => {
      this.tasksOfProject = taskList;
      console.log("task array"+this.tasksOfProject[0].assignee);
    }, 
    err => {
      console.log(err);
      return false;
    });
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
    //this.projectID = project_id
    // if(projectData['owner']['email'] == this.email){
    //   this.flag = true;
    // }
    // else{
    //   this.flag = false;
    // }
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
      dateDue:this.months[(this.monthDue-1)]+' '+this.dayDue,
      assignee:this.assignee,
    }
    console.log(task);
      this.authService.createTask(task).subscribe(data => {
        if(data['success']) {
          this.flashMessage.show('New task created', {cssClass: 'alert-success', timeout: 3000});
        } else {
          this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        }
      });
     }

  onEditTask() {
  this.showModalEdit = false;
  const task={
    _id:this.taskID,
    project:this.projectDetails,
    taskName:this.taskName,
    dateDue:this.months[(this.monthDue-1)]+' '+this.dayDue,
    assignee:this.assignee,
  }
  console.log("edited task"+task._id);
  console.log("edited task"+task.taskName);
  console.log("edited task"+task.assignee)
  //console.log(task);
    this.authService.editTask(task).subscribe(data => {
      if(data['success']) {
        this.flashMessage.show('Task updated successfully', {cssClass: 'alert-success', timeout: 3000});
      } else {
        this.flashMessage.show('Something went wrong!Try to edit task again', {cssClass: 'alert-danger', timeout: 3000});
      }
    });
    }

    onDeleteTask() {
      const pid= this.taskID;
      this.authService.deleteTask(pid).subscribe(data => {
        if(data['success']) {
          this.flashMessage.show('Project deleted', {cssClass: 'alert-success', timeout: 3000});
        } else {
          this.flashMessage.show('You cannot delete this project.. You are not the owner', {cssClass: 'alert-danger', timeout: 3000});
        }
      });
    }


}


// <!-- <div class="jumbotron text-center">
//   <h1>Workify App</h1>
//   <p class="lead">Welcome to WORKIFYY </p>
//   <div>
//     <a class="btn btn-primary" [routerLink]="['/register']">Register</a>
//     <a class="btn btn-dark" [routerLink]="['/login']">Login</a>
//   </div>
// </div> -->

// <script>
//   $(document).ready(function(){
//     $(".target").click(function(){
//        $(this).parent().siblings().removeClass("selectedClass");
//        $(this).parent().addClass("selectedClass");
//     });
//   });
// </script>

// <div *ngIf="projects!=null" class="main-content">
//   <h1 class="header">Your Projects</h1>
//   <button class="main-btn" (click) = "show()">Create another project</button>
//   <div class="modal-wrapper"></div>
//   <div class="projects-wrapper">
//     <!-- (click)="getProjectData(project._id)" -->
//     <div key={project._id} [routerLink]="['/projects',project._id]" class="project-icon" *ngFor="let project of projects">
//       <div class="project-name">{{project.name}}</div>
//       <div class="project-info-button">Edit project</div>
//       <div class="project-info-button">Go to project</div>
//       <!-- <a [routerLink]="['/projects',project._id]">details </a> -->
//     </div>
//   </div>
// </div>
// <div *ngIf="projects==null" class="main-content">
//   <div class="projects">
//     <div class="no-projects">
//       <h1 class="header">You have no projects</h1>
//       <button class="main-btn" (click) = "show()">
//         Create your first project
//       </button>
//       <div class="modal-wrapper">
//         <!-- <Modal onClose={this.toggleModal} modal={this.state.modal} /> -->
//       </div>
//     </div>
//   </div>
// </div>




// <!-- Create project Modal -->
// <div class="modal-wrapper">
//   <form class="modalPopup" (submit)="onCreateProject()" id="myModal" [style.display]="showModal ? 'block' : 'none'">
//     <span class="close-modal close" data-dismiss="modal" (click) = "hide()">×</span>
//     <h1 class="header">Create a project</h1>
//     <div class="form-group">
//       <label>
//         <div class="form-label">Project Name (required)</div>
//         <input id="projectName" name="projectName" [(ngModel)]="projectName" type="text" placeholder="My Awesome Project" class="form-input" value="">
//       </label>
//     </div>
//     <div class="form-label" >Add team members (optional)</div>
//     <button class="main-btn add-members" (click)="addMemberField()" ng-click="count = count + 1" ng-init="count=0">Add another member</button>
//     <!-- <div class="members showInputField" *ngFor="let member of members; let i = index" id="memberList"> -->
//       <div class="members showInputField"  id="memberList">
//       <div class="split" >
//         <label class="form-label" >Name{{i}} <input type="text" name="name"  [(ngModel)]="member.name" class="form-input m_email" value=""></label>
//         <label class="form-label" >Email{{i}} <input type="text" name="email" [(ngModel)]="member.email"  class="form-input m_name" value=""></label>
//         <span class="delete" onclick="removeMemberField()">REMOVE</span>
//       </div>
//     </div>
//     <div>
//       <button class="main-btn create-project" type="submit" value="Submit" >Create Project</button>
//     </div>
//   </form>
// </div>