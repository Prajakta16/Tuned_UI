import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import {
  DataServiceService
} from '../data-service.service';
import {
  sortBy
} from 'underscore';
import * as regular from '@fortawesome/free-regular-svg-icons';
import * as solid from '@fortawesome/free-solid-svg-icons';
import {
  each
} from 'underscore';
import {
  forkJoin
} from 'rxjs';
import {
  ActivatedRoute
} from '@angular/router';

declare var $;


@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {

  listType = {
    artist: "album",
    listener: "playlist"
  }

  toAddSongToList = {
    songIdToBeAdded: "",
    listType: "",
    listId: ""
  };

  adminPlaylistView = false;

  faComment = regular.faComment;
  faLikeFalse = regular.faThumbsUp;
  faLikeTrue = solid.faThumbsUp;
  faDislikeFalse = regular.faThumbsDown;
  faDislikeTrue = solid.faThumbsDown;
  faFavoriteTrue = solid.faHeart;
  faFavoriteFalse = regular.faHeart;
  faAdd = solid.faPlus;
  faDelete = regular.faTrashAlt;
  faPlay = regular.faPlayCircle;

  userType;
  userId;
  userName;

  commentSongId;
  comments = [];
  name: String;

  listOfPlaylists = [];
  listOfAlbums = [];

  category ;


  canDoActions = false;
  isAdmin = false;
  albums = null;

  songPreviewURL = "";
  songImageUrl = "";

  
  constructor(
    private dataservice: DataServiceService,
    private changesRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute
  ) {
    $('collapse').collapse({
      toggle: false
    })
    this.userId = parseInt(sessionStorage.getItem("userId"));
    this.userType = sessionStorage.getItem("userType");
    this.userName = sessionStorage.getItem("username");
    let APIArray = [];

    this.activatedRoute.paramMap.subscribe((params: any) => {
      
      if (params && params.params.view && params.params.view === "playlists") {
        
        this.isAdmin = true;
        this.category = params.params.view;
        this.canDoActions = false;
        this.adminPlaylistView = true;
        this.toAddSongToList.listType = "playlist";
        let getAllPlaylistAPI = this.dataservice.getAllPlaylists();
        getAllPlaylistAPI.subscribe((v: any) => {
          if (v) {
            this.albums = v;
            for (let i = 0; i < this.albums.length; i++) {
              this.albums[i]["arrow"] = `View ${this.albums[i].songs.length} songs`;
              this.albums[i]["songNum"] = this.albums[i].songs.length;
              for (let j = 0; j < this.albums[i].songs.length; j++) {
                
                if (this.albums[i].songs[j]) {

                  let activities = this.albums[i].songs[j].activities;
                  this.albums[i].songs[j].numOfLikes = 0;
                  this.albums[i].songs[j].numOfDislikes = 0;
                  this.albums[i].songs[j].preview_url = this.albums[i].songs[j].preview_url || "";
                  this.albums[i].songs[j].numOfFavorites = 0;
                  this.albums[i].songs[j].time = this.dataservice.convertMS(this.albums[i].songs[j].duration);
                  let currentUserActivity: any = {};
                  this.albums[i].songs[j].comments = [];
                  if (activities) {
                    each(activities, (act: any) => {
                      if (parseInt(this.userId) == act.listener_id) {
                        currentUserActivity = act;
                      }
                      if (act.likes) {
                        this.albums[i].songs[j].numOfLikes++;
                      }
                      if (act.dislikes) {
                        this.albums[i].songs[j].numOfDislikes++;
                      }
                      if (act.is_favourite) {
                        this.albums[i].songs[j].numOfFavorites++;
                      }
                      if (act.comment) {
                        let commentData = {
                          message: act.comment,
                          user: act.username || 'Anonymous',
                          userId: act.listener_id
                        }
                        this.albums[i].songs[j].comments.push(commentData);
                      }

                    });
                    
                    this.albums[i].songs[j].numOfComments = this.albums[i].songs[j].comments.length;
                    this.albums[i].songs[j].favorite = currentUserActivity.is_favourite || false;
                    this.albums[i].songs[j].like = currentUserActivity.likes || false;
                    this.albums[i].songs[j].dislike = currentUserActivity.dislikes || false;
                  }

                }






              }
            }

          } else {
            alert("Some error occured");
          }
        })
      } else {

        this.category = "albums"

        if (this.userType === "listener") {
          this.canDoActions = true;
          this.isAdmin = false;
          this.toAddSongToList.listType = "playlist";
          let getAllPlaylistForListenerAPI = this.dataservice.getAllPlaylistsForListener(this.userId);
          APIArray.push(getAllPlaylistForListenerAPI);
        } else if (this.userType === "admin") {
          this.isAdmin = true;
          this.canDoActions = false;
          this.toAddSongToList.listType = "playlist";
          let getAllAlbumsAPI = this.dataservice.getAllAlbums();
          let getAllPlaylistAPI = this.dataservice.getAllPlaylists();
          APIArray.push(getAllPlaylistAPI);
          APIArray.push(getAllAlbumsAPI);
        }

        forkJoin(APIArray).subscribe((results: any) => {
          if (results) {
            this.listOfPlaylists = results[0] || [];
            this.listOfPlaylists = sortBy(this.listOfPlaylists, "title");
            this.listOfAlbums = results[1] || [];
            this.listOfAlbums = sortBy(this.listOfAlbums, "title");

            each(this.listOfPlaylists, (item: any) => {
              item.id = item.playlist_id;
            })

            each(this.listOfAlbums, (item: any) => {
              item.id = item.album_id;
            })
          } else {

          }
          this.getAllAlbums();
        });
      }
    })



  }

  ngOnInit(): void {


  }

  setSongPreviewURL(song){
    // this.songImageUrl = song.album.image_url || "../../src/assets/images/NoImageAvailable.jpg";
     this.songPreviewURL = song.preview_url || 'false';
     
   }


  openDetails(album) {
    
    let category_id = album.playlist_id ? album.playlist_id : album.album_id;
    if (album.arrow !== `Close`) {
      album.arrow = "Close"
      
    } else {
      album.arrow = `View ${album.songs.length} songs`;
      
    }
  }

  getAllAlbums() {
    this.dataservice.getAllAlbums().subscribe((item: any) => {
      if (!item) {
        this.albums = [];
        return
      }
      
      this.albums = sortBy(item, "title");
      for (let i = 0; i < this.albums.length; i++) {
        this.albums[i]["arrow"] = `View ${this.albums[i].songs.length} songs`;
        this.albums[i]["songNum"] = this.albums[i].songs.length;
        let album_type = this.albums[i].album_type ;
        this.albums[i]["title"] += album_type ? ` (Type : ${album_type})` : "";
        for (let j = 0; j < this.albums[i].songs.length; j++) {
          if (this.albums[i].songs[j]) {
            let activities = this.albums[i].songs[j].activities;
            this.albums[i].songs[j].numOfLikes = 0;
            this.albums[i].songs[j].preview_url = this.albums[i].songs[j].preview_url || "";
            this.albums[i].songs[j].numOfDislikes = 0;
            this.albums[i].songs[j].numOfFavorites = 0;
            this.albums[i].songs[j].time = this.dataservice.convertMS(this.albums[i].songs[j].duration);
            let currentUserActivity: any = {};
            this.albums[i].songs[j].comments = [];
            if (activities) {
              each(activities, (act: any) => {
                if (parseInt(this.userId) == act.listener_id) {
                  currentUserActivity = act;
                }
                if (act.likes) {
                  this.albums[i].songs[j].numOfLikes++;
                }
                if (act.dislikes) {
                  this.albums[i].songs[j].numOfDislikes++;
                }
                if (act.is_favourite) {
                  this.albums[i].songs[j].numOfFavorites++;
                }
                if (act.comment) {
                  let commentData = {
                    message: act.comment,
                    user: act.username || 'Anonymous',
                    userId: act.listener_id
                  }
                  this.albums[i].songs[j].comments.push(commentData);
                }

              });
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

  setFavoriteSong(song) {


    this.dataservice.updateSongFavorite(this.userId, song.song_id, {
        favourite: !song.favorite
      })
      .subscribe((v: any) => {
        if(v){
          song.favorite = v.is_favourite || false;
          this.changesRef.detectChanges();
        }else{
          alert("Some issue occured");
        }
        

      });

  }

  likeSong(song) {

    this.dataservice.updateSongLike(this.userId, song.song_id, {
        like: !song.like
      })
      .subscribe((v: any) => {
        if(v){
          song.like = v.likes || false;
          if (v.likes) {
            song.numOfLikes++;
          } else {
            song.numOfLikes--;
          }
        }else{
          alert("Some issue occured");
        }
        
      });
  }

  dislikeSong(song) {
    this.dataservice.updateSongDislike(this.userId, song.song_id, {
        dislike: !song.dislike
      })
      .subscribe((v: any) => {
        if(v){
          song.dislike = v.dislikes || false;
          if (v.dislikes) {
            song.numOfDislikes++;
          } else {
            song.numOfDislikes--;
          }
        }else{
          alert("Some issue occured");
        }
        
      });

  }

  showComments(song) {
    this.comments = song.comments;
    this.commentSongId = song.song_id;
  }

  deleteSongFromList(category, song) {

    let listType = category.playlist_id ? "playlist" : "album";
    let songId = song.song_id;
    let songObject = {
      listType,
      listId: category.playlist_id ? category.playlist_id : category.album_id,
      songId

    }
    this.dataservice.removeSongFromList(songObject).subscribe((v: any) => {
      if (v) {
        alert("Song removed");
        window.location.reload();
      }else {
        alert("Some error occured");
      }
    })


  }

  deleteList(list) {

    
    let listType = list.album_id ? "album" : "playlist";
    let listId = list.album_id ? list.album_id : list.playlist_id;
    this.dataservice.deleteListById(listType, listId).subscribe((v: any) => {
      if (v) {
        alert(`${listType} Deleted`);
        window.location.reload();
      } else {
        alert("Some error occured");
      }
    })

  }


  


  setSongId(song) {
    
    this.toAddSongToList.songIdToBeAdded = song.song_id;
  }

  addSongToList(canAdd?) {

    if(!canAdd)
      return
    this.dataservice.addSongToList(this.toAddSongToList).subscribe((res: any) => {
      if (res) {

        alert(`Song Added to ${res.title}`);
       


        this.toAddSongToList.listId = "";
        this.toAddSongToList.listType = "playlist";
        this.toAddSongToList.songIdToBeAdded = "";
      }else {
        alert("Some error occured");
      }
    })

  }

}
