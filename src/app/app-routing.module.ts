import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import {SessionHomeComponent} from './session-home/session-home.component';
import {FavoritesComponent} from './favorites/favorites.component';
import {PeopleComponent} from './people/people.component';
import {PlaylistsComponent} from './playlists/playlists.component';
import {ExploreComponent} from './explore/explore.component';
import {ViewProfileComponent} from './view-profile/view-profile.component';
import {AlbumsComponent} from './albums/albums.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'home', component: SessionHomeComponent},
  { path: 'favorites', component: FavoritesComponent },
  { path: 'people/:id', component: PeopleComponent },
  { path: 'playlists/:id', component: PlaylistsComponent },
  { path: 'albums/:id', component: PlaylistsComponent},
  { path: 'explore', component: AlbumsComponent },
  { path : 'profile/:id/:type', component : ViewProfileComponent},
  { path : 'albums', component : AlbumsComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
