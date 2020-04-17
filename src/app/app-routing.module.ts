import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import {SessionHomeComponent} from './session-home/session-home.component';
import {FavoritesComponent} from './favorites/favorites.component';
import {PeopleComponent} from './people/people.component';
import {PlaylistsComponent} from './playlists/playlists.component';
import {ExploreComponent} from './explore/explore.component';


const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'home', component: SessionHomeComponent},
  { path: 'favorites', component: FavoritesComponent },
  { path: 'people', component: PeopleComponent },
  { path: 'playlists', component: PlaylistsComponent },
  { path: 'explore', component: ExploreComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
