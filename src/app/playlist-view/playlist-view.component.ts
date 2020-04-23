import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import * as regular from '@fortawesome/free-regular-svg-icons';
import * as solid from '@fortawesome/free-solid-svg-icons';
import { each } from 'underscore';
import { DataServiceService } from '../data-service.service';

declare var $;
@Component({
  selector: 'app-playlist-view',
  templateUrl: './playlist-view.component.html',
  styleUrls: ['./playlist-view.component.scss']
})
export class PlaylistViewComponent implements OnInit, OnChanges {

  @Input("data") data;
  @Input("heading") heading;
  @Input("userType") userType;
  @Input("listEmpty") listEmpty;
  @Input("userId") userId;
  
  

  @Output("addNew") addNew = new EventEmitter<any>();
  @Output("deleteSongFromList") delete = new EventEmitter<any>();
  @Output("deleteList") deleteList = new EventEmitter<any>();

  listType = {
    artist : "album",
    listener : "playlist"
  }

  canDoActions = false;
  

  faComment = regular.faComment;
  faLikeFalse = regular.faThumbsUp;
  faLikeTrue = solid.faThumbsUp;
  faDislikeFalse = regular.faThumbsDown;
  faDislikeTrue = solid.faThumbsDown;
  faFavoriteTrue = solid.faHeart;
  faFavoriteFalse = regular.faHeart;
  faDelete = regular.faTrashAlt

  faPlay = regular.faPlayCircle;


  commentSongId;
  comments = [];
  name: String;

  songPreviewURL = "";
  songImageUrl = "";

  setSongPreviewURL(song){
   // this.songImageUrl = song.album.image_url || "../../src/assets/images/NoImageAvailable.jpg";
    this.songPreviewURL = song.preview_url || 'false';
    
  }

  constructor(
    private dataservice : DataServiceService
  ) {
    
      
   }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.data);
    this.canDoActions = this.userType === "listener";
    
    
    for(let i=0; i < this.data.length; i++ ){
      
      let activities = this.data[i].activities;
      this.data[i].numOfLikes = 0;
      this.data[i].preview_url = this.data[i].preview_url || "";
      this.data[i].time = this.dataservice.convertMS(this.data[i].duration);
      this.data[i].numOfDislikes = 0;
      this.data[i].numOfFavorites = 0;
      let currentUserActivity : any = {};
      this.data[i].comments = [];
      each(activities, (act:any)=>{
        if(parseInt(this.userId) == act.listener_id){
          currentUserActivity = act;
        }
        if(act.likes){
          this.data[i].numOfLikes++;
        }
        if(act.dislikes){
          this.data[i].numOfDislikes++;
        }
        if(act.is_favourite){
          this.data[i].numOfFavorites++;
        }
        if(act.comment){
          let commentData =  {
            message : act.comment,
            user : act.username || 'Anonymous',
            userId : act.listener_id
          }
          this.data[i].comments.push(commentData);
        }
        
      });
      
      this.data[i].numOfComments = this.data[i].comments.length;
      this.data[i].favorite = currentUserActivity.is_favourite || false;
      this.data[i].like = currentUserActivity.likes || false;
      this.data[i].dislike = currentUserActivity.dislikes || false;
      



  }
  }

   addNewItemInList(){
    this.addNew.emit({
      name : this.name,
      type : this.listType[this.userType]
    });
    this.name = "";
   }

  ngOnInit(): void {
    
  }



  setFavoriteSong(song){
    

    this.dataservice.updateSongFavorite(this.userId, song.song_id, { favourite : !song.favorite})
    .subscribe((v : any)=>{
      if(v){
        song.favorite = v.is_favourite || false;
      }
      
  
    });
    
  }

  likeSong(song){

    this.dataservice.updateSongLike(this.userId, song.song_id, { like : !song.like})
    .subscribe((v : any)=>{
      if(v){
        song.like = v.likes || false;
        if(v.likes){
          song.numOfLikes++;
        }else{
        song.numOfLikes--;
        }
      }
      
    });
  }

  dislikeSong(song){
    this.dataservice.updateSongDislike(this.userId, song.song_id, { dislike : !song.dislike})
    .subscribe((v : any)=>{

      if(v){
        song.dislike = v.dislikes || false;
        
        if(v.dislikes){
          song.numOfDislikes++;
        }else{
        song.numOfDislikes--;
        }
      }
      
    });
    
  }

  showComments(song){
    
    this.comments = song.comments;
    this.commentSongId = song.song_id;
  }

  updateComments(event){
    
  }

  deleteSongFromList(song){
    this.delete.emit({
      songId : song.song_id 
    });
  }

  deleteListFromUser(){
    this.deleteList.emit();
  }


 


}
