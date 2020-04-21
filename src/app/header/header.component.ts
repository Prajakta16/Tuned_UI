import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../data-service.service';
import { each } from 'underscore';

interface FormElement {
  first_name : String;
  last_name : String;
  username : String;
  password : String;
  phone : String;
  address : String;
  dtype : String;
}

interface LoginForm {
  username : string,
  password : string,
  dtype : string
}

interface Search {
  searchType : string,
  searchValue : string
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
  
  search : Search = {
    searchType : "song",
    searchValue : ""
  }

  availableUsers  = {
    artist  : [],
    admin : "admin",
    listener : []
  }
  signupform : FormElement = {
    first_name : "",
    last_name : "",
    username : "",
    password : "",
    phone : "",
    address : "",
    dtype : ""
  };

  login : LoginForm = {
    username : "",
    password : "",
    dtype : ""
  };

  success = false;

  dissmiss = {
    signup : {
      allow : "modal",
      alert : false
    },
    login : {
      allow : "modal",
      alert : false
    }
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataservice : DataServiceService
  ) { 
    
    this.fetchAllArtists();
    this.fetchAllListeners();

  }

  ngOnInit(): void {

    
  }

  

  register(){

    if(
      this.signupform.first_name!== "" && 
      this.signupform.last_name!="" &&
      this.signupform.password!="" &&
      this.signupform.dtype!="" && 
      this.signupform.username!=""
    ){
      this.dataservice.addNewUser(this.signupform).subscribe(v=>{
          console.log(v);
          this.success = true;

        }
      );
      this.dissmiss.signup.allow = "modal";
    }else{
      this.dissmiss.signup.alert = true;
      this.dissmiss.signup.allow = "";
      this.success = true;
    }    
  }

  checkSignup(){
    if(
      this.signupform.first_name!== "" || 
      this.signupform.last_name!="" ||
      this.signupform.password!="" ||
      this.signupform.dtype!="" ||
      this.signupform.username!=""
    ){
      debugger
      this.dissmiss.signup.alert = false;
      return false;
    }else{
      return true;
    }
  }

  logging(){
    if(this.login.dtype === "admin"){
      this.login.username = "admin"
    }
    if(!(this.login.username && this.login.password && this.login.dtype)){
      alert("Please provide login details")
      return;
    }
    console.log(this.login);
    let userId = -1;
    debugger
    if(this.login.dtype === "admin"){
     
      sessionStorage.setItem('username', "admin");
    }else{
      sessionStorage.setItem('username', this.login.username);
      let users = this.availableUsers[this.login.dtype];
      
      each(users, (user : any)=> {
        if(user.username === this.login.username){
          userId = user.user_id;
          let userDetails = JSON.stringify(user);
          sessionStorage.setItem('userDetails', userDetails);
        }
      });
    }
    sessionStorage.setItem('userId', userId.toString());
    sessionStorage.setItem('userType', this.login.dtype);
    this.router.navigate(['/home']);
  }

  logout(){
    sessionStorage.clear();
    
    this.router.navigate(['/']);
  }


  fetchAllArtists(){
    this.dataservice.getAllUsers("artist").subscribe((v : Array<any>)=>{
      this.availableUsers.artist = v;
    });
  }

  fetchAllListeners(){
    this.dataservice.getAllUsers("listener").subscribe((v : Array<any>)=>{
      this.availableUsers.listener = v;
    });
  }

  searchData(){
    if(this.search.searchType === "artist"){
      this.router.navigate([`/artists/${this.search.searchValue}`]);
    }else if(this.search.searchType === "song"){
      this.router.navigate([`/songs/${this.search.searchValue}`]);
    }else{
      this.router.navigate([`/albumsearch/${this.search.searchValue}`]);
    }
    
  }

}
