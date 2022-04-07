import { Component, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';

import { ApiService } from '../api/api.service';
import { StorageService } from '../storage/storage.service';

type MovieInfo = {
  title: string,
  genres: Genre[],
  spoken_languages: SpokenLanguage[],
  release_date: string,
  runtime: number,
  overview: string,
  vote_average: number,
  tagline: string,
  poster_path: string,
};

type TvInfo = {
  name: string,
  genres: Genre[],
  spoken_languages: SpokenLanguage[],
  first_air_date: string,
  episode_run_time: [],
  overview: string,
  vote_average: number,
  tagline: string,
  poster_path: string,
};

type Video = {
  site: string;
  type: string;
  name: string;
  key: string;
};

type Genre = {
  id: number;
  name: string;
};

type SpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

let apiLoaded = false;  // only for youtube-player use

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit, OnChanges, OnDestroy {
  id: number;
  category: 'movie' | 'tv';
  info: MovieInfo | TvInfo = null;
  recommendations: [] = null;
  similar: [] = null;
  videos: Video[] = null;
  reviews: [] = null;
  casts: [] = null;
  videoId = 'tzkWB85ULJY';
  genresNameStr = '';
  spokenLanguagesNameStr = '';
  addedInMyList = false;
  showAddToWatchlistAlert = false;
  addToWatchlistAlertType: 'success' | 'danger' = 'success';
  addToWatchlistAlertCloseTimeoutId = null;
  matcher: MediaQueryList;
  isMobile = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private storageService: StorageService,
    private mediaMatcher: MediaMatcher,
    private breakpointObserver: BreakpointObserver,
  ) {
  }

  ngOnInit(): void {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.reset();
        this.init();
      }
    });
    this.init();
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

  reset(): void {
    this.info = null;
    this.recommendations = null;
    this.similar = null;
    this.videos = [];
    this.reviews = [];
    this.casts = null;
    this.videoId = 'tzkWB85ULJY';
    this.genresNameStr = '';
    this.spokenLanguagesNameStr = '';
    this.addedInMyList = false;
    this.showAddToWatchlistAlert = false;
    this.addToWatchlistAlertType  = 'success';
    this.addToWatchlistAlertCloseTimeoutId = null;
  }

  init(): void {
    this.route.params.subscribe(params => {
      this.id = +params.id;
      if (['movie', 'tv'].includes(params.category)) {
        this.category = params.category;
      } else {
        throw Error(`Invalid item category ${this.category} detected!`);
      }
    });

    this.apiService.getItemInfo(this.category, this.id)
      .subscribe(info => {
        this.info = info;
        this.setGenresNameStr();
        this.setSpokenLanguagesNameStr();
        this.initAddedInMyList();
      });
    this.apiService.getItemRecommendations(this.category, this.id)
      .subscribe(recommendations => {
        this.recommendations = recommendations;
      });
    this.apiService.getItemSimilar(this.category, this.id)
      .subscribe(similar => {
        this.similar = similar;
      });
    this.apiService.getItemVideos(this.category, this.id)
      .subscribe(videos => {
        this.videos = videos;
        this.setVideoId();
      });
    this.apiService.getItemReviews(this.category, this.id)
      .subscribe(reviews => {
        this.reviews = reviews;
      });
    this.apiService.getItemCasts(this.category, this.id)
      .subscribe(casts => {
        this.casts = casts;
      });

    // ref: https://github.com/angular/components/tree/master/src/youtube-player
    if (!apiLoaded) {
      // This code loads the IFrame Player API code asynchronously, according to the instructions at
      // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      apiLoaded = true;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  initAddedInMyList(): void {
    const currentItemHeaderKey = this.category === 'movie' ? 'title' : 'name';
    const currentItem = {
      id: this.id,
      [currentItemHeaderKey]: this.info[currentItemHeaderKey],
      poster_path: `${this.info.poster_path}`,
    };
    this.addedInMyList = this.storageService.queryItemInMylist(currentItem) >= 0;
    this.storageService.addItemToContinueWatching(currentItem);
  }

  setVideoId(): void {
    // TODO
    const trailerVideo = this.videos.filter(video => video.type === 'Trailer');
    if (trailerVideo) {
      const videoIdArr = /\?v=(\w+)$/.exec(trailerVideo[0].key);
      if (videoIdArr?.length > 1) {
        this.videoId = videoIdArr[1];
      }
    } else {
      const teaserVideo = this.videos.filter(video => video.type === 'Teaser');
      if (teaserVideo) {
        this.videoId = /\?v=(\w+)$/.exec(teaserVideo[0].key)[1];
      } else {
        if (this.videos.length > 0) {
          this.videoId = /\?v=(\w+)$/.exec(this.videos[0].key)[1];
        }
      }
    }
  }

  setGenresNameStr(): void {
    this.genresNameStr = this.info.genres.map(genre => genre.name).join(', ');
  }

  setSpokenLanguagesNameStr(): void {
    // tslint:disable-next-line:variable-name
    this.spokenLanguagesNameStr = this.info.spoken_languages.map(spoken_language => spoken_language.english_name).join(', ');
  }

  onAddToWatchlistButtonClick(): void {
    const currentItemHeaderKey = this.category === 'movie' ? 'title' : 'name';
    const currentItem = {
      id: this.id,
      [currentItemHeaderKey]: this.info[currentItemHeaderKey],
      poster_path: `${this.info.poster_path}`,
    };
    console.log(currentItem);
    if (this.addedInMyList) {
      // go remove
      this.storageService.removeItemFromMylist(currentItem);
      this.addToWatchlistAlertType = 'danger';
    } else {
      // go add
      this.storageService.addItemToMylist(currentItem);
      this.addToWatchlistAlertType = 'success';
    }
    this.addedInMyList = !this.addedInMyList;
    if (this.addToWatchlistAlertCloseTimeoutId !== null) {
      clearTimeout(this.addToWatchlistAlertCloseTimeoutId);
    }
    const that = this;
    // tslint:disable-next-line:only-arrow-functions
    this.addToWatchlistAlertCloseTimeoutId = setTimeout(function() {
      that.showAddToWatchlistAlert = false;
      that.addToWatchlistAlertCloseTimeoutId = null;
    }, 5000);
    this.showAddToWatchlistAlert = true;
  }

  onAddToWatchlistAlertTypeCloseButtonClick(): void {
    this.showAddToWatchlistAlert = false;
    if (this.addToWatchlistAlertCloseTimeoutId !== null) {
      clearTimeout(this.addToWatchlistAlertCloseTimeoutId);
      this.addToWatchlistAlertCloseTimeoutId = null;
    }
  }

  encodeURI(uri: string): string {
    return encodeURIComponent(uri);
  }

  formatRuntime(runtime: number): string {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime - hours * 60;
    let formatStr = '';
    if (hours > 0) {
      formatStr += hours + 'hrs ';
    }
    formatStr += minutes + 'mins';
    return formatStr;
  }

  calcSum(arr: number[]): number {
    let sum = 0;
    arr.forEach(val => sum += val);
    return sum;
  }

}
