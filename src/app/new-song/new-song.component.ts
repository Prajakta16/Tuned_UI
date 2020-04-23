import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../data-service.service';
import { sortBy } from 'underscore';
@Component({
  selector: 'app-new-song',
  templateUrl: './new-song.component.html',
  styleUrls: ['./new-song.component.scss']
})
export class NewSongComponent implements OnInit {

  song : any = {
    title : "",
    albumId : ""
  };
  userId;
  userType;
  userName;
  albumsList;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dataservice : DataServiceService
  ) {

        this.userId = parseInt(sessionStorage.getItem("userId"));
        this.userType = sessionStorage.getItem("userType");
        this.userName = sessionStorage.getItem("username");
        let API = this.userType === "admin" ? this.dataservice.getAllAlbums() : 
                      this.dataservice.getAllAlbumsForArtist(this.userId)

        API.subscribe((v:any)=>{
          if(v){
            this.albumsList = sortBy(v, "title");
          }
        })
    
   }

  ngOnInit(): void {
  }

  addToAlbum(){
    this.dataservice.addNewSongToAlbum(this.song.albumId, this.song).subscribe((v : any)=>{
      if(v){
        alert(`${this.song.title} to album`);
        //this.router.navigate(['/home']);
        this.song = {
          title : "",
          albumId : ""
        }
      }
      else{
        alert("Some error occured");
        this.song = {
          title : "",
          albumId : ""
        }
      }
    });
  }

}
