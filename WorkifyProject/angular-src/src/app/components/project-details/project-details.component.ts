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
  
 
}
