import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-session-home',
  templateUrl: './session-home.component.html',
  styleUrls: ['./session-home.component.scss']
})
export class SessionHomeComponent implements OnInit {


  username = "admin";
  userFirstName = "Admin";
  userDetails;
  searchKey;
  userId ;
  userType = "admin";


  pageStructure = {
    admin  : [],
    listener : [],
    artist : []
  }
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    let userid = sessionStorage.getItem("userId");
    if(userid!=="-1"){
      debugger
      this.userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
      this.userFirstName = this.userDetails.first_name;
      this.username = sessionStorage.getItem("username");
      this.userType = sessionStorage.getItem("userType");
      debugger
      this.userId = sessionStorage.getItem("userId");
      this.userType == "artist" ? this.loadArtistStructure() : this.loadListenerStructure();
    }else{
      this.loadAdminStructure();
    }
    
   }

  ngOnInit(): void {

  }

  loadAdminStructure(){
    this.pageStructure.admin = [
      {
        title : "People",
        message : "View list of all the people",
        headings : [
          "Listeners",
          "Artists"
        ]
      },
      {
        title : "Songs",
        message : "View list of all the songs",
      },
      {
        title : "Albums",
        message : "View list of all the albums",
        route : `/albums`,
      },
      {
        title : "Playlists",
        message : "View list of all the playlists",
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
        route : "/favorites"
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
        title : "Favorites",
        message : "Want to check out the songs you liked? You'll get it here."
      },
      {
        title : "People",
        message : "See who follow you and who you follow.",
        image : "../../assets/images/listener-home/people.jpg",
        route : `/people/${this.userId}`
      },
      {
        title : "Songs",
        message : "Check out all the songs which you have created."
      }
    ]

  }

  navigateTo(url){
    this.router.navigate([url]);
  }
}
