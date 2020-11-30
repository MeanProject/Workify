import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  projects:any;
  user:any
  constructor(  public authService:AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService) { 
  }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile['user'];
    },
     err => {
       console.log(err);
       return false;
     });

    this.authService.getProjects().subscribe(projectData => {
    this.projects = projectData['projectArr'];
  }, 
     err => {
       return false;
     });
  }

  onLogoutClick() {
    this.authService.logout();
    this.flashMessage.show('You are logged out', {
      cssClass: 'alert-success', timeout: 3000
    });
    this.router.navigate(['/login']);
    return false;
  }
}
