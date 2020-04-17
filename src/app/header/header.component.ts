import { Component, OnInit, Input } from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';

interface FormElement {
  dob: NgbDateStruct;
  fname : String;
  lname : String;
  username : String;
  password : String;
  gender : String;
  userType : String;
  passwordConf : String;
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

  signupform : FormElement = {
    dob: {year: null, month:null, day:null},
    fname : "",
    lname : "",
    username : "",
    password : "",
    gender : "",
    userType : "",
    passwordConf : ""
  };

  login : LoginForm = {
    username : "",
    password : ""
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  register(){
    console.log(this.signupform);
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
}
