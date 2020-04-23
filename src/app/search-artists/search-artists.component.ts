import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../data-service.service';
import { each } from 'underscore';

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

  userName;
  loggedIn = false;

  resultCount = -1;
  resultList = [];
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
          this.userName = sessionStorage.getItem("username");
          if(this.userName){
            this.loggedIn = true;
          }
          if(v && v.length && v.length!=0){
            this.resultCount = v.length;
            this.resultList = v;
          }else{
            this.resultList = [];
            this.resultCount = 0;
          }
          each(this.resultList, (res : any)=>{
            res.image_url = res.image_url || "../../assets/images/NoImageAvailable.jpg";
          })
          
        });
      }})
  }

  navigateToProfile(id){
    this.router.navigate([`/profile/${id}/artist`]);
  }

  ngOnInit(): void {
  }

  

}
