import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  DataServiceService
} from '../data-service.service';
import {
  each
} from 'underscore';
import {
  forkJoin
} from 'rxjs';

interface Search {
  searchType: string,
    searchValue: string
}


@Component({
  selector: 'app-search-songs',
  templateUrl: './search-songs.component.html',
  styleUrls: ['./search-songs.component.scss']
})
export class SearchSongsComponent implements OnInit, OnChanges {

  userName;
  userType;
  userId;
  loggedIn = false;
  isAdmin = false;
  isArtist = false;
  isListener = false;

  resultCount = -1;
  resultList = [];

  listOfPlaylists = [];
  listOfAlbums = [];

  convertMS = this.dataservice.convertMS;
  toAddSongToList = {
    songIdToBeAdded: "",
    listType: "",
    listId: ""
  };
  constructor(
    private activatedRoute: ActivatedRoute,
    private dataservice: DataServiceService
  ) {

    

    this.activatedRoute.paramMap.subscribe((params: any) => {
      if (params && params.params && params.params.search) {

        this.userName = sessionStorage.getItem("username");
        this.userId = sessionStorage.getItem("userId");
        this.userType = sessionStorage.getItem("userType");
        this.isAdmin = this.userType === "admin";
        this.isArtist = this.userType === "artist";
        this.isListener = this.userType === "listener";

        let search: Search = {
          searchType: "song",
          searchValue: params.params.search

        }

        this.resultList = [];
        
        this.dataservice.search(search).subscribe((v: any) => {
          let getAllAlbumsAPI = this.isAdmin ? this.dataservice.getAllAlbums() :
            this.dataservice.getAllAlbumsForArtist(this.userId);
          let getAllPlaylistAPI = this.isAdmin ? this.dataservice.getAllPlaylists() :
            this.dataservice.getAllPlaylistsForListener(this.userId);
          let APIArray = [];
          APIArray.push(getAllPlaylistAPI);
          APIArray.push(getAllAlbumsAPI);
          forkJoin(APIArray).subscribe((results: any) => {
            if (results) {
              this.listOfPlaylists = results[0] || [];
              this.listOfAlbums = results[1] || [];

              each(this.listOfPlaylists, (item: any) => {
                item.id = item.playlist_id;
              })

              each(this.listOfAlbums, (item: any) => {
                item.id = item.album_id;
              })
            }

          });



          this.toAddSongToList.listType = this.userType === "artist" ? "album" : "playlist";
          if (this.userName) {
            this.loggedIn = true;
          }
          if (v && v.length && v.length != 0) {
            this.resultCount = v.length;
            
            this.resultList = v;

            each(this.resultList, (res: any) => {
              let artists = [];
              res.image_url = res.image_url || "../../assets/images/NoImageAvailable.jpg";
              
              if (res.album && res.album.artists) {
                each(res.album.artists, (artist: any) => {
                  artists.push(artist.name);
                });
              }


              res.artistNames = artists.join(", ");

            });
          } else {
            this.resultList = [];
            this.resultCount = 0;
          }
        })
      }
    })
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    
  }

  setSongId(song) {
    
    this.toAddSongToList.songIdToBeAdded = song.song_id;
  }



  addSongToList(canAdd) {

    if(!canAdd)
      return


    this.dataservice.addSongToList(this.toAddSongToList).subscribe((res: any) => {
      if (res) {

        alert(`Song Added to ${res.title}`);

      } else {
        alert("Some error occured");
      }
    })

  }

}
