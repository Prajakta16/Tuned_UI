import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-playlist-view',
  templateUrl: './playlist-view.component.html',
  styleUrls: ['./playlist-view.component.scss']
})
export class PlaylistViewComponent implements OnInit {

  @Input("data") data;
  constructor() { }

  ngOnInit(): void {
  }

}
