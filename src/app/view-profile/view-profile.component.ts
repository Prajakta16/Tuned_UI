import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {

  isSelf = false;
  person = {
    name : "Aishwarya Chauhan",
    type : "Artist",
    email : "aishwarya@test.com",
    phone : "98767558345",
    help : "dewgweg",
    followers : [
      {
        name : "AIshwarya",
        id : 1
      },
      {
        name : "AIshwarya",
        id : 1
      },
      {
        name : "AIshwarya",
        id : 1
      },
      {
        name : "AIshwarya",
        id : 1
      },
      {
        name : "AIshwarya",
        id : 1
      }
    ],
    followings : [
      {
        name : "AIshwarya",
        id : 1
      },
      {
        name : "AIshwarya",
        id : 1
      },
      {
        name : "AIshwarya",
        id : 1
      },
      {
        name : "AIshwarya",
        id : 1
      },
      {
        name : "AIshwarya",
        id : 1
      },
      {
        name : "AIshwarya",
        id : 1
      },
      {
        name : "AIshwarya",
        id : 1
      },
      {
        name : "AIshwarya",
        id : 1
      },
      {
        name : "AIshwarya",
        id : 1
      },
      {
        name : "AIshwarya",
        id : 1
      }
    ]
  }

  editMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  navigateToProfile(id){
    this.router.navigate(['/profile']);
  }

  setEditMode(){
    this.editMode = !this.editMode;
  }

  saveProfileDetails(){
    this.editMode = false;
  }
    

}


