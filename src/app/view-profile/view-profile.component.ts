import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../data-service.service';
import { forkJoin } from 'rxjs';
import { each, filter } from 'underscore';
declare var $;

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {

  userId;
  userName;
  currentUserDetails;
  profileUserType;
  currentUserFollows;
  profileUserId;

  isAdmin = false;
  dataType = {
    artist : "album",
    listener : "playlists"
  }

  isSelf = false;
  categories : any = {
    title : "",
    songs : ""
  };
  person = {
    userId : "",
    firstName : "",
    lastName : "",
    type : "",
    username : "",
    email : "",
    phone : "",
    address : "",
    popularity : 0,
    dataType : "albums",
    biography : "",
    image : "" ,
    dataList : [],
    followers : [],
    followings : [],
    imageStyle : false
  }

  editMode = false;
  loggedIn = false;
  convertMS = this.dataservice.convertMS;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dataservice : DataServiceService,

  ) { 

    $('collapse').collapse({
      toggle: false
    });

    this.activatedRoute.paramMap.subscribe((params : any)=>{
      
      if(params && params.params && params.params.id && params.params.type){
        this.userId = sessionStorage.getItem("userId") && parseInt(sessionStorage.getItem("userId"));
        this.currentUserFollows = false;
        if(this.userId){
          this.loggedIn = true;
        }
        this.userName = sessionStorage.getItem("username");
        
        
        if(this.userName === 'admin'){
          this.isAdmin = true;
        }else{
          this.currentUserDetails = JSON.parse(sessionStorage.getItem("userDetails"));
        }
        
        this.profileUserType = params.params.type;
        this.profileUserId = parseInt(params.params.id);
        this.isSelf = parseInt(params.params.id) === this.userId;
        let getUserDetailsAPI = this.dataservice.getUserById(this.profileUserType,params.params.id)
        let followersAPI = this.dataservice.getFollowersByUserId(params.params.id);
        let followingsAPI = this.dataservice.getFollowingsByUserId(params.params.id);

        forkJoin([getUserDetailsAPI,followersAPI, followingsAPI]).subscribe((results : any)=>{
          
          let userInfo = results[0];
          let followers = results[1];
          let followings = results[2];
          if(!userInfo){
            alert("Some error occured");
            this.router.navigate(['/home']);
          }
          if(userInfo){
            this.person.userId = userInfo.user_id;
            this.person.firstName = userInfo.first_name;
            this.person.lastName =  userInfo.last_name;
            this.person.email = userInfo.email;
            this.person.phone = userInfo.phone;
            this.person.address = userInfo.address;
            this.person.biography = userInfo.biography;
            this.person.imageStyle = userInfo.image_url ? true : false;
            this.person.image = userInfo.image_url || "../../assets/images/NoImage.gif";
            this.person.popularity = userInfo.popularity;
            this.person.dataList = this.dataType[this.profileUserType] === "album" ?
                                   userInfo.producedAlbums : userInfo.playlists;
            this.person.dataType = this.dataType[this.profileUserType];
            this.person.username = userInfo.username;
            this.person.followers = [];
            this.person.followings = [];
            this.person.type = this.profileUserType;
            this.isSelf = parseInt(this.userId) === parseInt(params.params.id);
            if(followers){
              this.person.followers = followers;
              each(this.person.followers, (follower : any) => {
                if(follower.user_id === this.userId){
                  this.currentUserFollows = true;
                  follower.follows = true
                }
              });
            }
            if(followings){
              this.person.followings = followings;
              each(this.person.followings, (following : any) => {
                if(following.user_id === this.userId){
                  following.follows = true
                }
              });
            }

          }
          
        });
      }
    });

  }

  ngOnInit(): void {
  }

  navigateToProfile(user){
    
    if(!user.user_type){
      user.user_type = user.spotify_url ? "artist" : "listener";
    }
    this.router.navigate([`/profile/${user.user_id}/${user.user_type}`]);
  }

  setEditMode(){
    this.editMode = !this.editMode;
  }

  saveProfileDetails(){
    this.editMode = false;
    let person = {
      first_name : this.person.firstName,
      last_name : this.person.lastName,
      email : this.person.email,
      phone : this.person.phone,
      address : this.person.address,
      biography : this.person.biography

    }

    
    this.dataservice.updateProfile(this.profileUserId, person).subscribe((v : any)=>{
      if(v){
        alert("Profile updated");
        // sessionStorage.setItem("userDetails", JSON.stringify(v));
        // this.currentUserDetails = JSON.parse(sessionStorage.getItem("userDetails"));
      }
    });
    
  }

  setModalData(items){
    
    this.categories = items;
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

  follow(){
    this.dataservice.followUser(this.userId, this.person.userId).subscribe((v=>{
      if(v){
        
        this.currentUserFollows = true;
        this.currentUserDetails.follows = true;
        this.person.followers.push(this.currentUserDetails);
      }
    }));
  }

  unfollow(){
    this.dataservice.unfollowUser(this.userId, this.person.userId).subscribe((v)=>{
      if(v){
        
        this.currentUserFollows = false;
        this.currentUserDetails.follows = false;
        this.person.followers = filter(this.person.followers, (foll : any) => {
          return this.currentUserDetails.user_id != foll.user_id;
        });
    
      }
    });
  }
    

}


