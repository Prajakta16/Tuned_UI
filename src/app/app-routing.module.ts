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
import { SearchSongsComponent } from './search-songs/search-songs.component';
import { SearchArtistsComponent } from './search-artists/search-artists.component';
import { SearchResultsComponent } from './search-results/search-results.component';
const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'home', component: SessionHomeComponent},
  { path: 'favorites', component: FavoritesComponent },
  { path: 'people/:id', component: PeopleComponent },
  { path: 'playlists/:id', component: PlaylistsComponent },
  { path: 'albums/:id', component: PlaylistsComponent},
  { path: 'explore', component: AlbumsComponent },
  { path : 'profile/:id/:type', component : ViewProfileComponent},
  { path : 'albums', component : AlbumsComponent},
  { path : 'songs/:search', component : SearchSongsComponent},
  { path : 'artists/:search', component : SearchArtistsComponent},
  { path : 'albumsearch/:search', component : SearchResultsComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
