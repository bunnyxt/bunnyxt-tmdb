import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';

import { ApiService } from '../api/api.service';
import { StorageService } from '../storage/storage.service';

type Movie = { id: number, title: string, poster_path: string };
type Tv = { id: number, name: string, poster_path: string };

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {
  popularMovies: Movie[] = null;
  topRatedMovies: Movie[] = null;
  trendingMovies: Movie[] = null;
  popularTvs: Tv[] = null;
  topRatedTvs: Tv[] = null;
  trendingTvs: Tv[] = null;
  continueWatching: [] = [];
  matcher: MediaQueryList;
  isMobile = false;

  constructor(
    private apiService: ApiService,
    private storageService: StorageService,
    private mediaMatcher: MediaMatcher,
    private breakpointObserver: BreakpointObserver,
  ) {
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
    this.apiService.getPopularMovies()
      .subscribe(movies => {
        this.popularMovies = movies;
      });
    this.apiService.getTopRatedMovies()
      .subscribe(movies => {
        this.topRatedMovies = movies;
      });
    this.apiService.getTrendingMovies()
      .subscribe(movies => {
        this.trendingMovies = movies;
      });
    this.apiService.getPopularTvs()
      .subscribe(tvs => {
        this.popularTvs = tvs;
      });
    this.apiService.getTopRatedTvs()
      .subscribe(tvs => {
        this.topRatedTvs = tvs;
      });
    this.apiService.getTrendingTvs()
      .subscribe(tvs => {
        this.trendingTvs = tvs;
      });
    this.continueWatching = this.storageService.getContinueWatching();
  }

}
