import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HeaderComponent } from './header/header.component';
import { SlidesComponent } from './slides/slides.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SessionHomeComponent } from './session-home/session-home.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { PeopleComponent } from './people/people.component';
import { PlaylistViewComponent } from './playlist-view/playlist-view.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { CommentsComponent } from './comments/comments.component';
import { HttpClientModule }    from '@angular/common/http';
import { SearchResultsComponent } from './search-results/search-results.component';
import { AlbumsComponent } from './albums/albums.component';
import { SearchSongsComponent } from './search-songs/search-songs.component';
import { SearchArtistsComponent } from './search-artists/search-artists.component';
import { NewSongComponent } from './new-song/new-song.component';
import { SongsListComponent } from './songs-list/songs-list.component';
import { AllPeopleComponent } from './all-people/all-people.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    SlidesComponent,
    SignUpComponent,
    LoginComponent,
    SessionHomeComponent,
    PlaylistsComponent,
    FavoritesComponent,
    PeopleComponent,
    PlaylistViewComponent,
    ViewProfileComponent,
    CommentsComponent,
    SearchResultsComponent,
    AlbumsComponent,
    SearchSongsComponent,
    SearchArtistsComponent,
    NewSongComponent,
    SongsListComponent,
    AllPeopleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
