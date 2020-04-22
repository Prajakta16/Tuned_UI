import { Component, OnInit, Input, AfterViewChecked  } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewChecked {

  @Input("loginForm") login;
  @Input("usersList") usersList;

  list;

  constructor(

  ) { 

    
  }

  updateSelector(value){
    this.login.dtype = value
    this.list = this.usersList[value];
    this.login.username = "";
    this.login.password = "";
  }


  ngAfterViewChecked () {
  
  } 

  ngOnInit(): void {
  }


}
