import { Component, OnInit, Input, ChangeDetectorRef, OnChanges  } from '@angular/core';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnChanges {

  @Input("loginForm") login;
  //@Input("usersList") usersList;

  usersList  = {
    artists  : [],
    admin : "admin",
    listeners : []
  }

  constructor(
    private dataservice : DataServiceService,
    private det : ChangeDetectorRef 
  ) { 

    this.fetchAllArtists();
    this.fetchAllListeners();

    //this.det.detectChanges();
    
  }


  ngOnChanges(){
    this.det.detectChanges();
  }

  ngOnInit(): void {
  }

  fetchAllArtists(){
    this.dataservice.getUsers("artist").subscribe(v=>{
      debugger
      this.usersList.artists.concat(v);
      
    });

    //this.availableUsers.artists  = this.dataservice.getUsers("artist");
  }

  fetchAllListeners(){
    this.dataservice.getUsers("listener").subscribe(v=>{
     // this.availableUsers.listeners.concat(v);
    });
  }

}
