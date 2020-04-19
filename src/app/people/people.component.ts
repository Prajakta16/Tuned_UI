import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  followers = [
    {
      name : "Aishwarya",
      id : 1
    },
    {
      name : "Aishwarya",
      id : 1
    },
    {
      name : "Aishwarya",
      id : 1
    },
    {
      name : "Aishwarya",
      id : 1
    },
    {
      name : "Aishwarya",
      id : 1
    },
    {
      name : "Aishwarya",
      id : 1
    },
    {
      name : "Aishwarya",
      id : 1
    },
    {
      name : "Aishwarya",
      id : 1
    },
    {
      name : "Aishwarya",
      id : 1
    },
    {
      name : "Aishwarya",
      id : 1
    },
    {
      name : "Aishwarya",
      id : 1
    },
    {
      name : "Aishwarya",
      id : 1
    },
    {
      name : "Aishwarya",
      id : 1
    },
    {
      name : "Aishwarya",
      id : 1
    },
    {
      name : "Aishwarya",
      id : 1
    },
    {
      name : "Aishwarya",
      id : 1
    }
  ]

  followings = [
    {
      name : "Aishwarya",
      id : 1
    },
    {
      name : "Aishwarya",
      id : 1
    },
    {
      name : "Aishwarya",
      id : 1
    },
    {
      name : "Aishwarya",
      id : 1
    },
    {
      name : "Aishwarya",
      id : 1
    },
    {
      name : "Aishwarya",
      id : 1
    },
    {
      name : "Aishwarya",
      id : 1
    },
    {
      name : "Aishwarya",
      id : 1
    },
    {
      name : "Aishwarya",
      id : 1
    },
    {
      name : "Aishwarya",
      id : 1
    },
    {
      name : "Aishwarya",
      id : 1
    },
    {
      name : "Aishwarya",
      id : 1
    },
    {
      name : "Aishwarya",
      id : 1
    },
    {
      name : "Aishwarya",
      id : 1
    },
    {
      name : "Aishwarya",
      id : 1
    },
    {
      name : "Aishwarya",
      id : 1
    }
  ]

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  navigateToProfile(id){
    this.router.navigate(['/profile']);
  }
    
}