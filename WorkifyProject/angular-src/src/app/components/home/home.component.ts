import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms'
import { combineAll } from 'rxjs/operator/combineAll';
import { ThrowStmt } from '@angular/compiler';


declare var angular: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  projectID: String;
  myStyle:string;
  projectName:String;
  teamMembers:Object;
  member:Object[];
  total:Number=1;
  memberName:any[]=[];
  memberEmail:any[]=[];
  projects:Object;
  email: String;
  flag: Boolean;
  monthDue:any;
  dayDue:any;
  dateDue:any;
  pname:any;
  owner:any;
  projectForm: FormGroup;
  // name:[];
  // email:[];

 
  //projectDetails:Object;

  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage: FlashMessagesService,
    private _Activatedroute:ActivatedRoute,
    private fb:FormBuilder) {
      this.projectForm=this.fb.group({
        pname:'',
        monthDue:'',
        dayDue:'',
        members:this.fb.array([]),
      });
     }
    
    members() : FormArray {
      return this.projectForm.get("members") as FormArray
    }
    newMember(): FormGroup {
      return this.fb.group({
        name: '',
        email: '',
      })
    }
     
    addMember() {
      this.members().push(this.newMember());
    }
     
    removeMember(i:number) {
      this.members().removeAt(i);
    }
    
  ngOnInit() {
    this.authService.getProjects().subscribe(projectData => {
       this.projects = projectData['projectArr'];
       this.email = projectData['email']
       this.hideCreateProj();
       this.hideEditProj();
    }, 
     err => {
      //  console.log(err);
       return false;
     });
  }

  projectDetails:any;
  // sub: any;
  id: any;

  showModalCreate: boolean;
  showModalEdit: boolean;
  content: string;
  title: string;

  //Bootstrap Modal Open event
  showCreateProj()
  {
    this.showModalCreate = true; // Show-Hide Modal Check
    this.content = "This is content!!"; // Dynamic Data
    this.title = "This is title!!";    // Dynamic Data
  }
  //Bootstrap Modal Close event
  hideCreateProj()
  {
    this.showModalCreate = false;
  }

  showEditProj(project_id)
  {
    this.id=project_id
    this.showModalEdit = true;
    this.authService.getProjectDetails(this.id).subscribe(projectData => {
    this.projectDetails = projectData;
    console.log(this.projectDetails);
    this.projectID = project_id
    if(projectData['owner']['email'] == this.email){
      this.flag = true;
    }
    else{
      this.flag = false;
    }
  }, 
   err => {
     console.log(err);
     return false;
   });
  }
  hideEditProj()
  {
    this.showModalEdit = false;
  }
 
  months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  onCreateProject() {
    console.log(this.projectForm.value);

    const temp=this.projectForm.value;
    const project={
      projectName:temp.pname,
      dateDue:this.months[(temp.monthDue-1)]+' '+temp.dayDue,
      teamMembers:temp.members
    }
    console.log(project);

    this.authService.createProject(project).subscribe(data => {
      console.log(data);
      if(data['success']) {
        this.flashMessage.show('New Project created', {cssClass: 'alert-success', timeout: 3000});
      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
      }
    });
    }


    //edit project
    onEditProject() {
      console.log("home edit")
      if(this.projectName == undefined){
        this.projectName = this.projectDetails['name']
      }
      if(this.projectDetails.owner.name == undefined){
        this.projectDetails.owner.name= this.projectDetails['owner']['name']
      }
      if(this.memberEmail.length == 0){
        this.memberEmail = this.projectDetails['teamMembers'][0]['email']
      }
      if(this.memberName.length == 0){
        this.memberName = this.projectDetails['teamMembers'][0]['name']
      }
      
      const project={
        id: this.projectID,
        projectName:this.projectName,
        teamMembers:{
          name:this.memberName,
          email:this.memberEmail,
        },
      }
      console.log(project)
  
      this.authService.editProject(project).subscribe(data => {
        if(data['success']) {
          this.flashMessage.show('Project edited', {cssClass: 'alert-success', timeout: 3000});
        } else {
          this.flashMessage.show('You cannot edit this project.. You are not the owner', {cssClass: 'alert-danger', timeout: 3000});
        }
      });
    }

    onDeleteProject() {
      const pid= this.projectID;
      this.authService.deleteProject(pid).subscribe(data => {
        if(data['success']) {
          this.flashMessage.show('Project deleted', {cssClass: 'alert-success', timeout: 3000});
        } else {
          this.flashMessage.show('You cannot delete this project.. You are not the owner', {cssClass: 'alert-danger', timeout: 3000});
        }
      });
    }
  


  // getProjectData(id){
  //   this.authService.getProjectDetails(id).subscribe(projectData => {
  //     console.log(projectData);
  //      this.projectDetails = projectData;
  //   }, 
  //    err => {
  //      console.log(err);
  //      return false;
  //    });
  // }
  // projects=[];
  // projects=[
  //   {name:"first project",
  //   owner:"sakshi",
  //   teamMembers:[{"email":"hiral@gmai.com","name":"hiral"}],
  // },
  // {name:"firsttt project",
  //   owner:"sakshi",
  //   teamMembers:[{"email":"hiral@gmai.com","name":"hiral"}],
  // },
  // {name:"firstyttt project",
  //   owner:"sakshi",
  //   teamMembers:[{"email":"hiral@gmai.com","name":"hiral"}],
  // }
//   {name:"firstyttt project",
//   owner:"hetvi",
//   teamMembers:[{"email":"hiral@gmai.com","name":"hiral"}],
// }
  // ];
  

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
