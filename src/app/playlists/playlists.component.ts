import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {

  songsData = [
     
     {
      id : 1001,
      name : "Lorem",
      artist : "Aishwarya",
      music : "chauhan",
      random : "ipsum"
      }
    
  ]

  playlists = [
    {name : "p1", id : 1},
    {name : "p2", id : 2},
    {name : "p3", id : 3},
    {name : "p4", id : 4}
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
