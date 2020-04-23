import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../data-service.service';
import { forkJoin } from 'rxjs';

interface FormElement {
  first_name : String;
  last_name : String;
  username : String;
  password : String;
  phone : String;
  address : String;
  user_type : String;
}

@Component({
  selector: 'app-session-home',
  templateUrl: './session-home.component.html',
  styleUrls: ['./session-home.component.scss']
})
export class SessionHomeComponent implements OnInit {


  userName = "admin";
  userFirstName = "Admin";
  userDetails;
  searchKey;
  userId ;
  userType = "admin";
  isAdmin = false;

  artists = []
  listeners =  []

  albumAddSuccess = false;
  newItem = {
    userId : "",
    name : ""
  }
  

  success = false;
  playlistAddSuccess= false;

  dissmiss = {
    signup : {
      allow : "modal",
      alert : false
    },
    login : {
      allow : "modal",
      alert : false
    }
  }

  signupform : FormElement = {
    first_name : "",
    last_name : "",
    username : "",
    password : "",
    phone : "",
    address : "",
    user_type : ""
  };

  pageStructure = {
    admin  : [],
    listener : [],
    artist : []
  }
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dataservice : DataServiceService
  ) {
    let userid = sessionStorage.getItem("userId");
    if(userid!=="-1"){
      
      this.userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
      this.userFirstName = this.userDetails.first_name;
      this.userName = sessionStorage.getItem("username");
      
      this.userType = sessionStorage.getItem("userType");
      
      this.userId = sessionStorage.getItem("userId");
      this.userType == "artist" ? this.loadArtistStructure() : this.loadListenerStructure();
    }else{
      this.loadAdminStructure();
      forkJoin([this.dataservice.getAllUsers("artist"), 
      this.dataservice.getAllUsers("listener")]).subscribe((v:any)=>{
        if(v){
          this.artists = v[0] || [];
          this.listeners = v[1] || []
        }
      })
      
      this.isAdmin = true;
    }
    
   }

  ngOnInit(): void {

  }

  addAlbumItem(){

    this.dataservice.addNewListItem("album",this.newItem.userId,{
      title : this.newItem.name
    }).subscribe((v:any)=>{
      if(v){
        this.albumAddSuccess = true;
      }
      this.newItem.name = "";
      this.newItem.userId = "";
    });
  }

  addNewPlaylist(){

    this.dataservice.addNewListItem("playlist",this.newItem.userId,{
      title : this.newItem.name
    }).subscribe((v:any)=>{
      if(v){

        this.playlistAddSuccess = true;
      }

      this.newItem.name = "";
      this.newItem.userId = "";

    });
  }

  loadAdminStructure(){
    this.pageStructure.admin = [
      {
        title : "People",
        message : "View list of all the people",
        image : "../../assets/images/admin-home/people.jpg",
        route : "/people/list/all"
      },
      {
        title : "Songs",
        message : "View list of all the songs",
        image : "../../assets/images/admin-home/songs.jpg",
        route : "/songs"
      },
      {
        title : "Albums",
        message : "View list of all the albums",
        image : "../../assets/images/admin-home/albums.jpg",
        route : "/albums",
      },
      {
        title : "Playlists",
        message : "View list of all the playlists",
        image : "../../assets/images/admin-home/playlists.jpg",
        route : "/playlistAdmin/playlists",
      }

       
    ]

  }

  loadListenerStructure(){

    this.pageStructure.listener = [
      {
        title : "Playlists",
        message : "One station for the music library that you have created.",
        image : "../../assets/images/listener-home/casette.jpg",
        route : `/playlists/${this.userId}`
      },
      {
        title : "Favorites",
        message : "Want to check out the songs you liked? You'll get it here.",
        image : "../../assets/images/listener-home/favorites.jpg",
        route : `/favorites/${this.userId}`
      },
      {
        title : "People",
        message : "See who follow you and who you follow.",
        image : "../../assets/images/listener-home/people.jpg",
        route : `/people/${this.userId}`
      },
      {
        title : "Explore",
        message : "A curated library of unlimited songs, just for you.",
        image : "../../assets/images/listener-home/explore.jpg",
        route : "/explore"

      }
    ]

  }

  loadArtistStructure(){
    this.pageStructure.artist = [
      {
        title : "Albums",
        message : "One station for the music creations belonging to you.",
        route : `/albums/${this.userId}`,
        image : "../../assets/images/artist-home/albums.jpg",

      },
      {
        title : "Songs",
        message : "View songs by you and your fellow artists.",
        image : "../../assets/images/artist-home/songs.jpg",
        route : `/songs`
      },
      {
        title : "People",
        message : "See who follow you and who you follow.",
        image : "../../assets/images/listener-home/people.jpg",
        route : `/people/${this.userId}`
      },
      {
        title : "Create",
        message : "Have a new song? Create it here and share with the world.",
        image : "../../assets/images/artist-home/create.jpg",
        route : `/newSong`
      }
    ]

  }

  navigateTo(url){
    this.router.navigate([url]);
  }

  checkSignup(){
    if(
      this.signupform.first_name!== "" || 
      this.signupform.last_name!="" ||
      this.signupform.password!="" ||
      this.signupform.user_type!="" ||
      this.signupform.username!=""
    ){
      
      this.dissmiss.signup.alert = false;
      return false;
    }else{
      return true;
    }
  }

  register(){

    if(
      this.signupform.first_name!== "" && 
      this.signupform.last_name!="" &&
      this.signupform.password!="" &&
      this.signupform.user_type!="" && 
      this.signupform.username!=""
    ){
      
      this.dataservice.addNewUser(this.signupform).subscribe(v=>{
        if(v){
          if(v.success){
            console.log(v);
            this.success = true;
            window.location.reload();
            this.signupform = {
              first_name : "",
              last_name : "",
              username : "",
              password : "",
              phone : "",
              address : "",
              user_type : ""
            };
          }else{
            alert(v.error);
          }
 

        }else {
          alert("Some error occured");
        }
          
        }
      );
      this.dissmiss.signup.allow = "modal";
    }else{
      this.dissmiss.signup.alert = true;
      this.dissmiss.signup.allow = "";
      this.success = true;
    }    
  }
}
