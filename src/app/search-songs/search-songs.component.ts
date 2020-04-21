import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../data-service.service';

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
          debugger
        });
      }})
   }

  ngOnInit(): void {
  }

}
