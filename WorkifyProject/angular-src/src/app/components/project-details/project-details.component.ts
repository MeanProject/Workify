import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  
  projectDetails:Object;
  sub: any;
  id: any;

  constructor(private authService:AuthService, private router:Router,private _Activatedroute:ActivatedRoute) { }

  ngOnInit() {
    this.sub=this._Activatedroute.paramMap.subscribe(params => { 
       this.id = params.get('id'); 
       console.log(this.id);
       this.authService.getProjectDetails(this.id).subscribe(projectData => {
          console.log(projectData);
         this.projectDetails = projectData;
      }, 
       err => {
         console.log(err);
         return false;
       });
   });
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
  
  toggleModal(){
    console.log("toggle modal cliked");
  }
  createTask(){
    console.log("createTask cliked");
  }
  onClose(){
    console.log("onClose cliked");
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