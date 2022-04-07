import {Component, OnInit, OnDestroy} from '@angular/core';
import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';

import {ApiService} from '../../api/api.service';

type Movie = { id: number, title: string, backdrop_path: string };

@Component({
  selector: 'app-currently-playing-movies-carousel',
  templateUrl: './currently-playing-movies-carousel.component.html',
  styleUrls: ['./currently-playing-movies-carousel.component.css']
})
export class CurrentlyPlayingMoviesCarouselComponent implements OnInit, OnDestroy {
  movies: Movie[];
  showInfo = false;
  matcher: MediaQueryList;
  isMobile = false;

  constructor(
    private apiService: ApiService,
    private mediaMatcher: MediaMatcher,
    private breakpointObserver: BreakpointObserver,
  ) {
    this.movies = [];
    if (this.breakpointObserver.isMatched('(max-width: 768px)')) {
      this.isMobile = true;
    }
    this.matcher = this.mediaMatcher.matchMedia('(max-width: 768px)');
    this.matcher.addListener(this.mediaChangeListener);
  }

  mediaChangeListener(event): void {
    if (event.matches) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  ngOnDestroy(): void {
    this.matcher.removeListener(this.mediaChangeListener);
  }

  ngOnInit(): void {
    this.apiService.getCurrentPlayingMovies()
      .subscribe(movies => this.movies = movies.slice(0, 5));
  }

  onMouseEnter(): void {
    this.showInfo = true;
  }

  onMouseLeave(): void {
    this.showInfo = false;
  }

}
