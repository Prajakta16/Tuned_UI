import { Component, OnInit, Input } from '@angular/core';
import * as regular from '@fortawesome/free-regular-svg-icons';
import * as solid from '@fortawesome/free-solid-svg-icons';
declare var $;
@Component({
  selector: 'app-playlist-view',
  templateUrl: './playlist-view.component.html',
  styleUrls: ['./playlist-view.component.scss']
})
export class PlaylistViewComponent implements OnInit {

  @Input("data") data;
  @Input("heading") heading;

  faComment = regular.faComment;
  comments = [
    {
      message : "AMZINFNBJHG",
      time : 3,
      user : "Aishwaraya"
    },
    {
      message : "AMZINFNBJHG",
      time : 3,
      user : "Aishwaraya"
    },
    {
      message : "AMZINFNBJHG",
      time : 3,
      user : "Aishwaraya"
    },
    {
      message : "AMZINFNBJHG",
      time : 3,
      user : "Aishwaraya"
    },
    {
      message : "AMZINFNBJHG",
      time : 3,
      user : "Aishwaraya"
    }
  ];
  

  playlistName: String;

  constructor() {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })

    $(function () {
      $('.collapse').collapse(
        {
          toggle: false
        }
      );
     
    })

    
   }

  ngOnInit(): void {
      for(let i=0; i < this.data.length; i++ ){
        this.data[i].favorite = regular.faHeart;
        this.data[i].like = regular.faThumbsUp;

    }
  }



  setFavoriteSong(song){
    if(song.favorite == solid.faHeart){
      song.favorite = regular.faHeart;
    }else{
      song.favorite = solid.faHeart;
    }
    
  }

  likeSong(song){
    if(song.like == solid.faThumbsUp){
      song.like = regular.faThumbsUp;
      song.likesNum--;
    }else{
      song.like = solid.faThumbsUp;
      song.likesNum++;
    }

    
  }

}
