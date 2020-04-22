import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../data-service.service';
import { forkJoin } from 'rxjs';
import { sortBy } from 'underscore';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  likes = [];
  dislikes = [];
  favorites = [];
  userId;
  userType;
  userName;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dataservice : DataServiceService
  ) { 

    this.activatedRoute.paramMap.subscribe((params : any)=>{
        
        this.userId = sessionStorage.getItem("userId") && parseInt(sessionStorage.getItem("userId"));
        this.userType = sessionStorage.getItem("userType");
        this.userName = sessionStorage.getItem("username");
        if(params && params.params && params.params.id){
          this.userId = parseInt(params.params.id);
          let likesAPI = this.dataservice.getAllLikedSongsForAListener(this.userId);
          let dislikesAPI = this.dataservice.getAllDislikedSongsForAListener(this.userId);
          let favoritesAPI = this.dataservice.getAllFavoriteSongsForAListener(this.userId);
          forkJoin([likesAPI, dislikesAPI, favoritesAPI]).subscribe((res : any) =>{
            if(res){
              this.likes = res[0] || [];
              this.likes = sortBy(this.likes, "title");
              this.dislikes = res[1] || [];
              this.dislikes = sortBy(this.dislikes, "title");
              this.favorites = res[2] || [];
              this.favorites = sortBy(this.favorites, "title");
            }else{
              
            }
          })

        }else{
          alert("Some error Occured");
          
        }
      });

  }

  ngOnInit(): void {
  }

}
