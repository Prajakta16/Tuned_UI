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
import { ExploreComponent } from './explore/explore.component';
import { PlaylistViewComponent } from './playlist-view/playlist-view.component';

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
    ExploreComponent,
    PlaylistViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
