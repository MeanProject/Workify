import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {DataTableModule} from "angular-6-datatable";

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { MytasksComponent } from './components/mytasks/mytasks.component';

const appRoutes: Routes =  [
  {path:'', component: HomeComponent,canActivate:[AuthGuard]},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path:'all', component: MytasksComponent,canActivate:[AuthGuard]},
  {path:'projects/:id', component: ProjectDetailsComponent,canActivate:[AuthGuard]},
  {path:'create',component:HomeComponent,canActivate:[AuthGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    SideNavComponent,
    ProjectDetailsComponent,
    MytasksComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DataTableModule,
    ReactiveFormsModule ,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot()
  ],
  providers: [ValidateService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
