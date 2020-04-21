import { Component, OnInit, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { sortBy } from 'underscore'; 
import * as regular from '@fortawesome/free-regular-svg-icons';
import * as solid from '@fortawesome/free-solid-svg-icons';
import { each } from 'underscore';

declare var $;


@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit, OnChanges {

  listType = {
    artist : "album",
    listener : "playlist"
  }
  faComment = regular.faComment;
  faLikeFalse = regular.faThumbsUp;
  faLikeTrue = solid.faThumbsUp;
  faDislikeFalse = regular.faThumbsDown;
  faDislikeTrue = solid.faThumbsDown;
  faFavoriteTrue = solid.faHeart;
  faFavoriteFalse = regular.faHeart;

  userType;
  userId;
  userName;

  commentSongId;
  comments = [];
  name: String;


  canDoActions = false;
  albums = null;
  constructor(
    private dataservice : DataServiceService,
    private changesRef : ChangeDetectorRef
  ) {
    $('collapse').collapse({
      toggle: false
    })
    this.userId = parseInt( sessionStorage.getItem("userId"));
    this.userType = sessionStorage.getItem("userType");
    this.userName = sessionStorage.getItem("username");
    if(this.userType === "listener"){
      this.canDoActions = true;
      this.getAllAlbums();
     }else if(this.userType === "admin"){
       this.getAllAlbums();
     }

     this.getAllAlbums();
   }

   ngOnInit(): void {

    
  }

  ngOnChanges(changes : SimpleChanges){
    debugger

  }

  openDetails(album){
    if(album.arrow === "Open"){
      album.arrow = "Close"
    }else{
      album.arrow = `View ${album.songs.length} songs`; 
    }
  }

  getAllAlbums(){
    this.dataservice.getAllAlbums().subscribe((item : any)=>{
      this.albums = item;
      for(let i = 0; i < this.albums.length; i++){
        this.albums[i]["arrow"] = `View ${this.albums[i].songs.length} songs`; 
        this.albums[i]["songNum"] = this.albums[i].songs.length;
        for(let j=0; j < this.albums[j].songs.length; j++ ){
          debugger
          if(this.albums[i].songs[j]){

          let activities = this.albums[i].songs[j].activities;
          this.albums[i].songs[j].numOfLikes = 0;
          this.albums[i].songs[j].numOfDislikes = 0;
          this.albums[i].songs[j].numOfFavorites = 0;
          let currentUserActivity : any = {};
          this.albums[i].songs[j].comments = [];
          if(activities){
            each(activities, (act:any)=>{
              if(parseInt(this.userId) == act.listener_id){
                currentUserActivity = act;
              }
              if(act.likes){
                this.albums[i].songs[j].numOfLikes++;
              }
              if(act.dislikes){
                this.albums[i].songs[j].numOfDislikes++;
              }
              if(act.is_favourite){
                this.albums[i].songs[j].numOfFavorites++;
              }
              if(act.comment){
                let commentData =  {
                  message : act.comment,
                  user : act.username || 'Anonymous',
                  userId : act.listener_id
                }
                this.albums[i].songs[j].comments.push(commentData);
              }
              
            });
            debugger
            this.albums[i].songs[j].numOfComments = this.albums[i].songs[j].comments.length;
            this.albums[i].songs[j].favorite = currentUserActivity.is_favourite || false;
            this.albums[i].songs[j].like = currentUserActivity.likes || false;
            this.albums[i].songs[j].dislike = currentUserActivity.dislikes || false;
          }

          }
          
         
          
    
    
    
      }
        
        
      };

      this.albums = sortBy(this.albums, 'songNum').reverse(); 

    })
  }

  setFavoriteSong(song){
    

    this.dataservice.updateSongFavorite(this.userId, song.song_id, { favourite : !song.favorite})
    .subscribe((v : any)=>{
      song.favorite = v.is_favourite || false;
      this.changesRef.detectChanges();
  
    });
    
  }

  likeSong(song){

    this.dataservice.updateSongLike(this.userId, song.song_id, { like : !song.like})
    .subscribe((v : any)=>{
      song.like = v.likes || false;
      if(v.likes){
        song.numOfLikes++;
      }else{
      song.numOfLikes--;
      }
    });
  }

  dislikeSong(song){
    this.dataservice.updateSongDislike(this.userId, song.song_id, { dislike : !song.dislike})
    .subscribe((v : any)=>{
      song.dislike = v.dislikes || false;
      debugger
      if(v.dislikes){
        song.numOfDislikes++;
      }else{
      song.numOfDislikes--;
      }
    });
    
  }

  showComments(song){
    this.comments = song.comments;
    this.commentSongId = song.song_id;
  }

}
