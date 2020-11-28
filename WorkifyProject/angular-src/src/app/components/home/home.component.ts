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
      // this.del=this.update;
      // console.log(this.del);
    }
    project:any;
    adminProjects:any[]=[];
    teamMemberProjects:any[]=[];
    getProjects(){
      this.adminProjects=[];
      this.teamMemberProjects=[];
      this.authService.getProjects().subscribe(projectData => {
        this.projects = projectData['projectArr'];
        this.email = projectData['email']
        for(var project of this.projects){
          // console.log(project)
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
      console.log("read thiss");
      // console.log(userData);
      // this.email = userData['email'];
   }, 
    err => {
     //  console.log(err);
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
        console.log('project details')
      this.projectDetails = projectData;
      console.log(this.projectDetails);
        this.updateMembers=this.projectDetails['project']['teamMembers'];
        console.log('update');
        console.log(this.updateMembers);
        this.editUsers=[];
        console.log(this.users);
        console.log(this.updateMembers);
        for(var i in this.users)
        {
        for(var k in this.updateMembers){
          if(this.users[i].name != this.updateMembers[k].name){
              this.editUsers.push(this.users[i]);
          }
        }

      }
      console.log(this.editUsers);        
          
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
      teamMembers:temp.members
    }
    console.log(project);
    this.authService.createProject(project).subscribe(data => {
      console.log(data);
      if(data['success']) {
        this.showModalCreate = false;
        this.getProjects();
        this.flashMessage.show('New Project created', {cssClass: 'alert-success', timeout: 3000});
      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
      }
    });
    }

deleteOld(){

}
    //edit project
    onEditProject() {
      console.log("home edit")
      if(this.pname == undefined){
        this.pname = this.projectDetails['project']['name'];
        console.log(this.projectDetails['project']['name']);
      }
      this.projectID=this.projectDetails['project']['_id'];
      console.log(this.projectID);
      console.log(this.editProjectForm.value);
      const temp=this.editProjectForm.value;
      let array=temp.editMembers;
      for(let i in this.updateMembers){
        array.push(this.updateMembers[i]);
      }
      
    console.log(array);

      const projectupdate={
        id:this.projectID,
        projectName:this.pname,
        teamMembers:array
      }
     
      console.log(projectupdate);
  
      this.authService.editProject(projectupdate).subscribe(data => {
        this.hideEditProj();
        if(data['success']) {
          this.flashMessage.show('Project edited', {cssClass: 'alert-success', timeout: 3000});

        } else {
          this.flashMessage.show('You cannot edit this project.. You are not the owner', {cssClass: 'alert-danger', timeout: 3000});
        }
      });
    }

    onDeleteProject() {
      this.projectID=this.projectDetails['project']['_id'];
      const pid= this.projectID;
      console.log(pid);
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
