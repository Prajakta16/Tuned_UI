import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-session-home',
  templateUrl: './session-home.component.html',
  styleUrls: ['./session-home.component.scss']
})
export class SessionHomeComponent implements OnInit {

  searchKey = "";
  constructor() { }

  ngOnInit(): void {
  }

}
