import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import {  ActivatedRoute} from '@angular/router';
import { each } from 'underscore';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {

  selectMsg = "";
  userType;
  userId;

  songsData = []

  setList = [];

  listName = "";
  noList = true;
  userName = "";

  listType = {
    artist : "Album",
    listener : "Playlist"
  }


  constructor(
    private dataservice : DataServiceService,
    private activatedRoute : ActivatedRoute
  ) {

    this.activatedRoute.paramMap.subscribe((params : any)=>{
      if(params.params.id){
        this.userId = parseInt(params.params.id);
        this.userType = sessionStorage.getItem("userType");
        this.userName = sessionStorage.getItem("username");
        if(this.userType === "listener"){
          this.selectMsg = "Select Playlist";
          this.getAllPlaylistsForListener(params.params.id);
          
         }else if(this.userType === "artist"){
            this.selectMsg = "Select Albums";
            debugger
            this.getAlbumForArtist(params.params.id);
         }else{
           this.getAllPlaylists();
         }
      }else{
        this.getAllPlaylists();
      }
    })

   }

  ngOnInit(): void {
  }

  getAlbumForArtist(artistId){
    this.dataservice.getAllAlbumsForArtist(artistId).subscribe((item:any)=>{
      if(item && item.length!=0){
        each(item, (v : any) => {
          v["id"] = v["album_id"];
        });

        this.setList = item;
        this.listName = this.setList[0].title;
        this.songsData = this.setList[0].songs;
        
        debugger
        this.noList = false;

      }else{
        this.noList = true;
      }
    });

  }


  getAllPlaylistsForListener(listenerId){
    this.dataservice.getAllPlaylistsForListener(listenerId).subscribe((item : any)=>{
      if(item && item.length!=0){
        each(item, v => {
          v["id"] = v["playlist_id"];
        });
        debugger
        this.setList = item;
        this.listName = this.setList[0].title;
        this.songsData = this.setList[0].songs;
        this.noList = false;
      }
      else{
        this.noList = true;
      }
    });
  }

  getAllPlaylists(){
    this.dataservice.getAllPlaylists().subscribe((item : any)=>{
      debugger
    });
  }

  updateSong(item){

    debugger
  
    this.songsData = item.songs

  }

  addItem(data : any){
    this.dataservice.addNewListItem( data.type, this.userId, {
      title : data.name
    }).subscribe(v=>{
      debugger
      if(data.type === "album"){
        debugger
        this.setList = v["producedAlbums"]
         each(this.setList, v => {
          v["id"] = v["album_id"];
        });
      }else{
        debugger
         this.setList = v["playlists"]
         each(this.setList, v => {
          v["id"] = v["playlist_id"];
        });
      }
      
      
    })
  }

  

}
