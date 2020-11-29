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
  projects:any;
  users:Object;
  editUsers:any;
  email: String;
  flag: Boolean;
  monthDue:any;
  dayDue:any;
  pname:any;
  owner:any;
  projectForm: FormGroup;
  editProjectForm: FormGroup;
  del:any;
  project:any;
  adminProjects:any[]=[];
  teamMemberProjects:any[]=[];


  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage: FlashMessagesService,
    private _Activatedroute:ActivatedRoute,
    private fb:FormBuilder) 
    {
      this.projectForm=this.fb.group({
        pname:'',
        members:this.fb.array([]),
      });
      this.editProjectForm=this.fb.group({
        pname:'',
        editMembers:this.fb.array([]),
      });
     }
    //create modal
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

    //edit modal
    editMembers() : FormArray {
      return this.editProjectForm.get("editMembers") as FormArray
    }
   
    addEditMember() {
      this.editMembers().push(this.newMember());
    }
     
    removeEditMember(i:number) {
      this.editMembers().removeAt(i);
    }
    deleteMember(i:number){
      delete this.updateMembers[i];
    }
    getProjects(){
      this.adminProjects=[];
      this.teamMemberProjects=[];
      this.authService.getProjects().subscribe(projectData => {
        this.projects = projectData['projectArr'];
        this.email = projectData['email']
        for(var project of this.projects){
           if(project['owner']['email']==this.email){
             this.adminProjects.push(project);
           }
           else{
             this.teamMemberProjects.push(project);
           }
        }
     }, 
       err => {
         return false;
       });
    }
  ngOnInit() {

    this.authService.getUsers().subscribe(userData => {
      this.users = userData['userArr'];
   }, 
    err => {
      return false;
    });
    this.getProjects();
    this.hideCreateProj();
    this.hideEditProj();
  }

  projectDetails:any;
  // sub: any;
  id: any;
  arr:any;

  showModalCreate: boolean;
  showModalEdit: boolean;
  content: string;
  title: string;
  updateMembers:any;

  //Bootstrap Modal Open event
  showCreateProj()
  {
    // this.addMember();
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
        this.updateMembers=this.projectDetails['project']['teamMembers'];
        this.editUsers=[];

        for(var i in this.users)
        {
          let isNotMember=true;
          for(var k in this.updateMembers){
            if(this.users[i].name == this.updateMembers[k].name){
                isNotMember=false;
            }
          }
          if(isNotMember){
            this.editUsers.push(this.users[i]);
          }
      }
      
          
    });
  }

  hideEditProj()
  {
    this.showModalEdit = false;
  }
 
  months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  onCreateProject() {

    const temp=this.projectForm.value;
    const project={
      projectName:temp.pname,
      teamMembers:temp.members
    }

    this.authService.createProject(project).subscribe(data => {
      this.getProjects();
      if(data['success']) {
        this.showModalCreate = false;
      
        this.flashMessage.show('New Project created', {cssClass: 'alert-success', timeout: 3000});
      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
      }
    });
    }

  //edit project
    onEditProject() {

      if(this.pname == undefined){
        this.pname = this.projectDetails['project']['name'];

      }
      this.projectID=this.projectDetails['project']['_id'];
      const temp=this.editProjectForm.value;
      let array=temp.editMembers;
      for(let i in this.updateMembers){
        array.push(this.updateMembers[i]);
      }
      
      const projectupdate={
        id:this.projectID,
        projectName:temp.pname,
        teamMembers:array
      }
     
      this.authService.editProject(projectupdate).subscribe(data => {
        this.hideEditProj();
        this.getProjects();
        if(data['success']) {
          this.flashMessage.show('Project edited', {cssClass: 'alert-success', timeout: 3000});

        } else {
          this.flashMessage.show('You cannot edit this project.. You are not the owner', {cssClass: 'alert-danger', timeout: 3000});
        }
      });
    }

    onDeleteProject() {
      this.getProjects();
      this.projectID=this.projectDetails['project']['_id'];
      const pid= this.projectID;
      this.authService.deleteProject(pid).subscribe(data => {
        this.hideEditProj();
        if(data['success']) {
          this.flashMessage.show('Project deleted', {cssClass: 'alert-success', timeout: 3000});
        } else {
          this.flashMessage.show('You cannot delete this project.. You are not the owner', {cssClass: 'alert-danger', timeout: 3000});
        }
      });
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
