import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../data-service.service';

interface Search {
  searchType : string,
  searchValue : string
}

@Component({
  selector: 'app-search-artists',
  templateUrl: './search-artists.component.html',
  styleUrls: ['./search-artists.component.scss']
})
export class SearchArtistsComponent implements OnInit {

  
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dataservice : DataServiceService
  ) { 
    this.activatedRoute.paramMap.subscribe((params : any)=>{
      if(params && params.params && params.params.search){
        let search : Search =  {
          searchType : "artist",
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
