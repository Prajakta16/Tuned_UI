import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../data-service.service';
import { forkJoin } from 'rxjs';
import { each, filter, sortBy } from 'underscore';
@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  followers = []
  followings = []
  followerCount = 0;
  followingCount = 0;

  userId;
  userType;
  userName;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dataservice : DataServiceService
  ) { 
    this.activatedRoute.paramMap.subscribe((params : any)=>{
      if(params && params.params && params.params.id){
        this.userId = parseInt(sessionStorage.getItem("userId"));
        this.userType = sessionStorage.getItem("userType");
        this.userName = sessionStorage.getItem("username");
        let followersAPI = this.dataservice.getFollowersByUserId(params.params.id);
        let followingsAPI = this.dataservice.getFollowingsByUserId(params.params.id);
        forkJoin([followersAPI, followingsAPI]).subscribe((results : any) => {
          if(results && results[0] && results[0].length>=0 && results[1] && results[1].length >=0){
            this.followers = sortBy(results[0], "username");
            this.followings =  sortBy(results[1], "username");
          }else{
            this.followers = [];
            this.followings = [];
          }

          this.updateFollowingsAndFollowers();
          this.followerCount = this.followers.length;
          this.followingCount = this.followings.length;
          
          
        });
      }
      
      

    })
  }

  ngOnInit(): void {
  }

  navigateToProfile(user){
    
    this.router.navigate([`/profile/${user.user_id}/${user.user_type}`]);
  }

  follow(user){
    this.dataservice.followUser(this.userId, user.user_id).subscribe((v=>{
      if(v){
        user.follow = true;
        this.followings.push(user);
        this.updateFollowingsAndFollowers();
      }
    }));

    
    

  }

  unfollow(user){
    this.dataservice.unfollowUser(this.userId, user.user_id).subscribe((v)=>{
      if(v){

        this.followings = filter(this.followings, (foll : any) => {
          return user.user_id != foll.user_id;
        });
        
    
        this.updateFollowingsAndFollowers();
      }else{
        alert("Some error occured");
      }
    });
  }

  updateFollowingsAndFollowers(){

    
    let followingIdList = [];
          each(this.followings, (followings : any)=>{
            followings.follow = true;
            followingIdList.push(followings.user_id);
          });

          each(this.followers, (follower : any)=>{
            if(followingIdList.indexOf(follower.user_id)!=-1){
              follower.follow = true;
            }else{
              follower.follow = false;
            }

          });
          this.followerCount = this.followers.length;
          this.followingCount = this.followings.length;
  }
    
}