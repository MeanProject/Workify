import { Injectable } from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient) {
      //this.isDev = false;  // Change to false before deployment
    }

  registerUser(user) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return this.http.post('http://localhost:3000/users/register',user,httpOptions)
      .map(res => res);
  }

  authenticateUser(user) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return this.http.post('http://localhost:3000/users/authenticate', user,httpOptions)
      .map(res => res);
  }
  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
  
  getUsers() {
    this.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
         'Authorization': this.authToken
      })
    };
    return this.http.get('http://localhost:3000/users', httpOptions)
      .map(res => res);
  }


  getProfile() {
    this.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
         'Authorization': this.authToken
      })
    };
    return this.http.get('http://localhost:3000/users/profile', httpOptions)
      .map(res => res);
  }
  //specific user all projects
  getProjects() {
    this.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
         'Authorization': this.authToken
      })
    };
    return this.http.get('http://localhost:3000/projects', httpOptions)
      .map(res => res);
  }

   //specific project
   getProjectDetails(id) {
    this.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
         'Authorization': this.authToken
      })
    };
    return this.http.get(`http://localhost:3000/projects/${id}`, httpOptions)
      .map(res => res);
  }

  createProject(project) {
    console.log(project);
    this.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authToken
      })
    };
    return this.http.post('http://localhost:3000/projects/create',project,httpOptions)
      .map(res => res);
  }

  editProject(project) {
    console.log("auth edit");
    this.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authToken
      })
    };
    return this.http.patch('http://localhost:3000/projects/update',project,httpOptions)
      .map(res => res);
  }

  deleteProject(id) {
    this.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authToken
      })
    };
    return this.http.delete(`http://localhost:3000/projects/delete/${id}`,httpOptions)
      .map(res => res);
  }


  //get taskS FOR SPECIFIC PROJECT===pass project id
  getProjectTasks(id) {
    this.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
         'Authorization': this.authToken
      })
    };
    return this.http.get(`http://localhost:3000/tasks/project/${id}`, httpOptions)
      .map(res => res);
  }

  //specific task ===pass task id
  getTaskDetails(id) {
    this.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
         'Authorization': this.authToken
      })
    };
    return this.http.get(`http://localhost:3000/tasks/${id}`, httpOptions)
      .map(res => res);
  }

  createTask(task) {
    this.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authToken
      })
    };
    return this.http.post('http://localhost:3000/tasks/create',task,httpOptions)
      .map(res => res);
  }

  editTask(task) {
    this.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authToken
      })
    };
    return this.http.patch('http://localhost:3000/tasks/update',task,httpOptions)
      .map(res => res);
  }

  checkTask(task) {
    this.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authToken
      })
    };
    return this.http.patch('http://localhost:3000/tasks/check',task,httpOptions)
      .map(res => res);
  }

  deleteTask(id) {
    this.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authToken
      })
    };
    return this.http.delete(`http://localhost:3000/tasks/delete/${id}`,httpOptions)
      .map(res => res);
  }

}
