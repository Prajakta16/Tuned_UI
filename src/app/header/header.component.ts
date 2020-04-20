import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../data-service.service';
import { Observable } from 'rxjs';

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
  password : string,
  dtype : string
}


// interface availableUsers{
//   artists : Observable<Array<any>>,
//   listeners : Observable<Array<any>>,
//   admin : string

// }

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input("loggedIn") loggedIn;
  @Input("showUsername") userName : String;
  @Input("searchKey") searchKey;
  

  availableUsers  = {
    artists  : [],
    admin : "admin",
    listeners : []
  }
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
    password : "",
    dtype : ""
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataservice : DataServiceService
  ) { 
    
   // this.fetchAllListeners();
  }

  ngOnInit(): void {

    
  }

  

  register(){

    debugger
    console.log(this.signupform);
    this.dataservice.addNewUser(this.signupform).subscribe(
      v=>console.log(v)
    );
    
    
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
