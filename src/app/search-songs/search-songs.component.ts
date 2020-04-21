import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../data-service.service';
import { each } from 'underscore';

interface Search {
  searchType : string,
  searchValue : string
}


@Component({
  selector: 'app-search-songs',
  templateUrl: './search-songs.component.html',
  styleUrls: ['./search-songs.component.scss']
})
export class SearchSongsComponent implements OnInit {

  userName;
  loggedIn = false;

  resultCount = -1;
  resultList = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private dataservice : DataServiceService
  ) {
    
    this.activatedRoute.paramMap.subscribe((params : any)=>{
      if(params && params.params && params.params.search){

        let search : Search =  {
          searchType : "song",
          searchValue : params.params.search

        }
        this.dataservice.search(search).subscribe((v : any) => {
          this.userName = sessionStorage.getItem("username");
          if(this.userName){
            this.loggedIn = true;
          }
          if(v && v.length && v.length!=0){
            this.resultCount = v.length;
            this.resultList = v;
            
            each(this.resultList, (res : any)=>{
              let artists = [];
              debugger
              if(res.album && res.album.artists){
                each(res.album.artists, (artist : any)=>{
                  artists.push(artist.name);
                });
              }
              

              res.artistNames = artists.join(", ");

            });
          }
          else{
            this.resultCount = 0;
          }
        })
      }})
   }

  ngOnInit(): void {
  }

}
