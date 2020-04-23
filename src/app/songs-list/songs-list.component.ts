import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../data-service.service';
import * as solid from '@fortawesome/free-solid-svg-icons';
import * as regular from '@fortawesome/free-regular-svg-icons';
import { forkJoin } from 'rxjs';
import { each, filter } from 'underscore';

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.scss']
})
export class SongsListComponent implements OnInit {

  songsList : any = []
  listOfAlbums : any = []
  listOfPlaylists : any = []
  userId;
  userType;
  userName;
  toAddSongToList = {
    songIdToBeAdded : "",
    listType : "playlist",
    listId : ""
  } ;

  songPreviewURL = "";
  songImageUrl = "";

  faAdd = solid.faPlus;
  faDelete = regular.faTrashAlt;
  faPlay = regular.faPlayCircle;

  isAdmin = false;

  convertMS = this.dataservice.convertMS;

 
  setSongPreviewURL(song){
    this.songImageUrl = song.album.image_url || "../../src/assets/images/NoImageAvailable.jpg";
    this.songPreviewURL = song.preview_url || 'false';
    
  }
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dataservice : DataServiceService
  ) { 
    
    //PLAYER


    //PLAYER

      this.userId = sessionStorage.getItem("userId") && parseInt(sessionStorage.getItem("userId"));
      this.userType = sessionStorage.getItem("userType");
      this.userName = sessionStorage.getItem("username");
      if(this.userName === "admin"){
        this.isAdmin = true;
      }
      let getAllAlbumsAPI = this.dataservice.getAllAlbums();
      let getAllSongsAPI = this.dataservice.getAllSongs();
      let fecthAllArtists = this.dataservice.getAllUsers("artist");
      let getAllPlaylistAPI = this.dataservice.getAllPlaylists() ;
          
      forkJoin([getAllSongsAPI, getAllAlbumsAPI, fecthAllArtists,getAllPlaylistAPI]).subscribe((v:any)=>{
        if(v){
          this.songsList = v[0] || [];
          this.listOfAlbums = v[1] || [];
          this.listOfPlaylists = v[3] || [];
          let artists = v[2] || [];

          each(this.listOfPlaylists, (item: any) => {
            item.id = item.playlist_id;
          })
         
          let albumMap = {};
          
          each(artists, (art : any) => {
            if(art.producedAlbums && art.producedAlbums.length){
              each(art.producedAlbums, (album : any)=>{
                if(!albumMap[album.album_id]){
                  albumMap[album.album_id] = []
                }
                let artistsName = `${art.first_name} ${art.last_name}`;
                albumMap[album.album_id].push(artistsName || art.username); 
              })
            }
          })
          let songMap = {};
          each(this.listOfAlbums, (album)=>{
            if(album.songs && album.songs.length){
              each(album.songs, (song : any )=>{
                songMap[song.song_id] = album;
              });
            }
          })
          each(this.songsList, (song : any)=>{
            song.album = songMap[song.song_id];
            
            if(song.album && song.album){
              song.artists = albumMap[song.album.album_id] && albumMap[song.album.album_id].join(", ")
              
            }

                
          })
   
        }
      })
  }

  ngOnInit(): void {
  }

  setSongId(song){
    this.toAddSongToList.songIdToBeAdded = song.song_id;
  }

  addSongToList(canAdd){

    if(!canAdd)
    return
    
    this.dataservice.addSongToList(this.toAddSongToList).subscribe((v : any)=>{
      if(v){
        this.toAddSongToList.listId = "";
        this.toAddSongToList.listType = "playlist";
        this.toAddSongToList.songIdToBeAdded = "";
        alert("Song added");
      }else{
        alert("Some Error occured");
      }
    });
  }

  deleteSong(song){
    this.dataservice.deleteSongById(song.song_id).subscribe( (v : any)=>{
      if(v && v.Success){
        alert("Deleted "+song.title);
        this.songsList = filter(this.songsList, (s : any)=>{
          return song.song_id!=s.song_id
        })
      }
      else{
        alert("Some error occured")
      }
    })
    

  }

}
