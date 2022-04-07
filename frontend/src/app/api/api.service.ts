import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

type ItemCategory = 'movie' | 'tv';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // private rootUrl = 'http://localhost:8080/';
  // private rootUrl = 'https://bunnyxt-usc-films-api.wl.r.appspot.com/';
  private rootUrl = '';

  constructor(private http: HttpClient) {
  }

  getCurrentPlayingMovies(): any {
    return this.http.get(this.rootUrl + 'api/current_playing/movies');
  }

  getPopularMovies(): any {
    return this.http.get(this.rootUrl + 'api/popular/movies');
  }

  getTopRatedMovies(): any {
    return this.http.get(this.rootUrl + 'api/top_rated/movies');
  }

  getTrendingMovies(): any {
    return this.http.get(this.rootUrl + 'api/trending/movies');
  }

  getPopularTvs(): any {
    return this.http.get(this.rootUrl + 'api/popular/tvs');
  }

  getTopRatedTvs(): any {
    return this.http.get(this.rootUrl + 'api/top_rated/tvs');
  }

  getTrendingTvs(): any {
    return this.http.get(this.rootUrl + 'api/trending/tvs');
  }

  getItemInfo(category: ItemCategory, id: number): any {
    return this.http.get(this.rootUrl + `api/${category}s/${id}`);
  }

  getItemRecommendations(category: ItemCategory, id: number): any {
    return this.http.get(this.rootUrl + `api/${category}s/${id}/recommendations`);
  }

  getItemSimilar(category: ItemCategory, id: number): any {
    return this.http.get(this.rootUrl + `api/${category}s/${id}/similar`);
  }

  getItemVideos(category: ItemCategory, id: number): any {
    return this.http.get(this.rootUrl + `api/${category}s/${id}/videos`);
  }

  getItemReviews(category: ItemCategory, id: number): any {
    return this.http.get(this.rootUrl + `api/${category}s/${id}/reviews`);
  }

  getItemCasts(category: ItemCategory, id: number): any {
    return this.http.get(this.rootUrl + `api/${category}s/${id}/casts`);
  }

  getPersonDetail(id: number): any {
    return this.http.get(this.rootUrl + `api/persons/${id}`);
  }

  getPersonExternalIds(id: number): any {
    return this.http.get(this.rootUrl + `api/persons/${id}/external_ids`);
  }

  search(query: string): any {
    return this.http.get(this.rootUrl + `api/search?query=${encodeURIComponent(query)}`);
  }

  searchForSearchBar(query: string): any {
    return this.http.get(this.rootUrl + `api/search_for_search_bar?query=${encodeURIComponent(query)}`);
  }

}
