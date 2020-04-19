import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
declare var $;
@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {

  isSelf = false;
  categories = {
    name : "",
    songs: ""
  };
  person = {
    name : "Aishwarya Chauhan",
    type : "Artist",
    email : "aishwarya@test.com",
    phone : "98767558345",
    help : "dewgweg",
    dataType : "albums",
    albums : [
      {
        name : "A1",
        id : 1,
        songs : [
          {
            name : "Song1",
            artist : "Artist1",
            id : 1,
            music : "test"
          },
          {
            name : "Song1",
            artist : "Artist1",
            id : 2,
            music : "test"
          },
          {
            name : "Song1",
            artist : "Artist1",
            id : 3,
            music : "test"
          }
        ]
      }
    ],
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
  ) { 

    $('collapse').collapse({
      toggle: false
    });

  }

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

  setModalData(index, type){
    this.categories = this.person[type][index];
    for(let i = 0; i < this.categories.songs.length; i++){
      this.categories.songs[i]["arrow"] = "Open"; 
    }
  }

  openDetails(category){
    if(category.arrow === "Open"){
      category.arrow = "Close"
    }else{
      category.arrow = "Open"
    }
  }
    

}


