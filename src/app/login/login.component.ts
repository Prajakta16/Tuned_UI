import { Component, OnInit, Input, ChangeDetectorRef, OnChanges, ChangeDetectionStrategy,NgZone, AfterViewInit, AfterViewChecked  } from '@angular/core';
declare var $;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
 // changeDetection: ChangeDetectionStrategy.OnPush
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
    $('.selectpicker').selectpicker();

  }


  ngAfterViewChecked () {
    //noinspection TypeScriptUnresolvedFunction
    $('.selectpicker').selectpicker();
  } 

  ngOnInit(): void {
  }


}
