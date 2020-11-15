import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // projects=[];
  projects=[
    {name:"first project",
    owner:"sakshi",
    teamMembers:[{"email":"hiral@gmai.com","name":"hiral"}],
  },
  {name:"firsttt project",
    owner:"sakshi",
    teamMembers:[{"email":"hiral@gmai.com","name":"hiral"}],
  },
  {name:"firstyttt project",
    owner:"sakshi",
    teamMembers:[{"email":"hiral@gmai.com","name":"hiral"}],
  }
  ];
  

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
