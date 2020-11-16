import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  projects:Object;
  //projectDetails:Object;

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
    console.log("Itnit called");
    this.authService.getProjects().subscribe(projectData => {
      console.log(projectData);
       this.projects = projectData;
    }, 
     err => {
       console.log(err);
       return false;
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
