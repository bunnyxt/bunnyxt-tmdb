import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { YouTubePlayerModule } from '@angular/youtube-player';

import { AppComponent } from './app.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { SearchBarComponent } from './top-nav/search-bar/search-bar.component';
import { MyListComponent } from './my-list/my-list.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CurrentlyPlayingMoviesCarouselComponent } from './home-page/currently-playing-movies-carousel/currently-playing-movies-carousel.component';
import { PopularMoviesComponent } from './home-page/popular-movies/popular-movies.component';
import { ItemsDisplaySectionComponent } from './common/items-display-section/items-display-section.component';
import { ItemCardComponent } from './common/item-card/item-card.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { CastCardComponent } from './detail-page/cast-card/cast-card.component';
import { CastDisplaySectionComponent } from './detail-page/cast-display-section/cast-display-section.component';
import { ReviewCardComponent } from './detail-page/review-card/review-card.component';
import { ReviewDisplaySectionComponent } from './detail-page/review-display-section/review-display-section.component';

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    SearchBarComponent,
    MyListComponent,
    HomePageComponent,
    CurrentlyPlayingMoviesCarouselComponent,
    PopularMoviesComponent,
    ItemsDisplaySectionComponent,
    ItemCardComponent,
    DetailPageComponent,
    CastCardComponent,
    CastDisplaySectionComponent,
    ReviewCardComponent,
    ReviewDisplaySectionComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterModule.forRoot([
      {path: '', component: HomePageComponent},
      {path: 'mylist', component: MyListComponent},
      {path: 'watch/:category/:id', component: DetailPageComponent},
    ]),
    FormsModule,
    HttpClientModule,
    YouTubePlayerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
