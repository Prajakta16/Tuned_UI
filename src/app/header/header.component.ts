import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../data-service.service';
import { Observable, of } from 'rxjs';

interface FormElement {
  first_name : String;
  last_name : String;
  username : String;
  password : String;
  phone : String;
  address : String;
  passwordConf? : String;
}

interface LoginForm {
  username : string,
  password : string
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  @Input("loggedIn") loggedIn;
  @Input("showUsername") userName : String;
  @Input("searchKey") searchKey;
  

  signupform : FormElement = {
    first_name : "",
    last_name : "",
    username : "",
    password : "",
    phone : "",
    address : "",
    //passwordConf : ""
  };

  login : LoginForm = {
    username : "",
    password : ""
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataservice : DataServiceService
  ) { }

  ngOnInit(): void {

    this.getAllArtists();
  }

  register(){

    debugger
    console.log(this.signupform);
    this.dataservice.addNewUser(this.signupform);
    
    
  }

  logging(){
    console.log(this.login);
    this.router.navigate(['/home']);
  }

  logout(){
    setTimeout(()=>{
      this.router.navigate(['']);
    },3000)
  }

  setValues(){
    
  }

  getAllArtists(){
    let artists = this.dataservice.getAllArtists().subscribe(v=>{
      debugger
      console.log(v);
    });
  }
}
