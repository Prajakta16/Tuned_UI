import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../data-service.service';

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
  albumsList = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dataservice : DataServiceService
  ) {

    this.userId = parseInt(sessionStorage.getItem("userId"));
        this.userType = sessionStorage.getItem("userType");
        this.userName = sessionStorage.getItem("username");

        this.dataservice.getAllAlbumsForArtist(this.userId).subscribe((v:any)=>{
          if(v){
            this.albumsList = v;
          }
        })
    
   }

  ngOnInit(): void {
  }

  addToAlbum(){
    this.dataservice.addNewSongToAlbum(this.song.albumId, this.song).subscribe((v : any)=>{
      if(v){
        alert(`${this.song.title} to album`);
        this.router.navigate(['/home']);
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