import { Component, OnInit, ChangeDetectionStrategy, OnChanges, SimpleChanges, ChangeDetectorRef} from '@angular/core';
import { DataServiceService } from '../data-service.service';
import {  ActivatedRoute} from '@angular/router';
import { each, find, filter } from 'underscore';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss'],
  changeDetection : ChangeDetectionStrategy.Default
})
export class PlaylistsComponent implements OnInit, OnChanges {

  selectMsg = "";
  canDoActions = false;
  userType;
  userId;
  listId;

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
    private activatedRoute : ActivatedRoute,
    private detectChanges : ChangeDetectorRef
  ) {

    this.activatedRoute.paramMap.subscribe((params : any)=>{
      if(params.params.id){
        this.userId = parseInt(params.params.id);
        this.userType = sessionStorage.getItem("userType");
        this.userName = sessionStorage.getItem("username");
        if(this.userType === "listener"){

          this.canDoActions = true;
          this.selectMsg = "Select Playlist";
          this.getAllPlaylistsForListener(params.params.id);
          
         }else if(this.userType === "artist"){
            this.selectMsg = "Select Albums";
            
            this.getAlbumForArtist(params.params.id);
         }else{
           this.getAllPlaylists();
         }
      }else{
        this.getAllPlaylists();
      }
    })

   }
  ngOnChanges(changes: SimpleChanges): void {
    
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
        this.listId = this.setList[0].id;
        this.songsData = this.setList[0].songs || [];
        
        
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
        
        this.setList = item;
        this.listName = this.setList[0].title;
        this.listId =  this.setList[0].id;
        this.songsData = this.setList[0].songs || [];
        this.noList = false;
      }
      else{
        this.noList = true;
      }
    });
  }

  getAllPlaylists(){
    this.dataservice.getAllPlaylists().subscribe((item : any)=>{
      
    });
  }

  updateSong(item){
    
    
    this.listId = item.id;
    this.songsData = item.songs || [];
    this.listName = item.title;

  }

  addItem(data : any){
    this.dataservice.addNewListItem( data.type, this.userId, {
      title : data.name
    }).subscribe(v=>{
      
      if(v){
        
      //window.location.reload();
      if(data.type === "album"){
        
        this.setList = v["producedAlbums"]
         each(this.setList, v => {
          v["id"] = v["album_id"];
        });
      }else{
        
         this.setList = v["playlists"]
         each(this.setList, v => {
          v["id"] = v["playlist_id"];

        });
      }

      
      if(this.setList.length===1){
        this.songsData = this.setList[0].songs || [];
        this.listId = this.setList[0].id;
        this.listName = this.setList[0].title;
      }
      this.detectChanges.detectChanges();
      }
      
      
    });
  }

  deleteSongFromList(event){

    let songObject = {
      listType : this.listType[this.userType].toLowerCase(),
      listId : this.listId,
      songId : event.songId
    }
    this.dataservice.removeSongFromList(songObject).subscribe((res : any) => {
      if(res){
        let item = find(this.setList, (item : any) => item.id === this.listId);
        let songs = filter(item.songs, (song : any) => song.song_id != event.songId);
        
        each(this.setList, (v : any ) => {
          if(v.id === item.id ){
            v.songs = songs;
          }
        } );
    
        this.songsData = songs || [];
        let msg = this.listType[this.userType].toLowerCase() === "playlist" ? "removed" : "deleted";
        alert("Song has been " + msg);
      }
    });
    
    
  }

  deleteList(){
    let deleteObj = {
      userId : this.userId,
      userType : this.userType,
      listType : this.listType[this.userType].toLowerCase(),
      listId : this.listId
    }
    this.dataservice.removeList(deleteObj).subscribe((v : any)=>{
      
      if(v){
        
        let dataType = this.listType[this.userType].toLowerCase() ;
       
        if(dataType === "album"){
          
          this.setList = v["producedAlbums"] || [];
           each(this.setList, v => {
            v["id"] = v["album_id"];
          });
        }else{
          
           this.setList = v["playlists"] || [];
           each(this.setList, v => {
            v["id"] = v["playlist_id"];
  
          });
        }

        
        
        this.setHomePage();
      }

     
      
    })
  }

  setHomePage(){
    
      this.songsData =  this.setList[0] && this.setList[0].songs || [];
      this.listId = this.setList[0] && this.setList[0].id || "";
      this.listName = this.setList[0] &&  this.setList[0].title || "";
  }

  

}
