import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../data-service.service';

import { each } from 'underscore';
declare var $;

interface Search {
  searchType : string,
  searchValue : string
}


@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  userName;
  loggedIn = false;
  categories : any = {};

  resultCount = -1;
  resultList = [];

  convertMS = this.dataservice.convertMS;
  constructor(
    private activatedRoute: ActivatedRoute,
    private dataservice : DataServiceService
  ) {
    

    $('collapse').collapse({
      toggle: false
    });
    this.activatedRoute.paramMap.subscribe((params : any)=>{
      if(params && params.params && params.params.search){

        let search : Search =  {
          searchType : "album",
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
              
              res.image_url = res.image_url || "../../assets/images/NoImageAvailable.jpg";
              if(res.artists){
                each(res.artists, (artist : any)=>{
                  artists.push(artist.name);
                });
              }
              

              res.artistNames = artists.join(", ");

            });

          }
          else{
            this.resultList = [];
            this.resultCount = 0;
          }
        })
      }})
   }

  ngOnInit(): void {
  }

  setModalData(items){
    
    this.categories = items;
    for(let i = 0; i < this.categories.songs.length; i++){
      this.categories.songs[i]["arrow"] = "Open"; 
    }
  }


  openDetails(category){
    if(category.arrow === "Open"){
      category.arrow = "Close"
    }else{
      category.arrow = "Open"
    }
  }

  resetModal(){
    this.categories = {}
  }

}
