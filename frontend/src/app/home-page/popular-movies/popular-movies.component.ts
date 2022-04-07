import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../api/api.service';

type Movie = { id: number, title: string, poster_path: string };

@Component({
  selector: 'app-popular-movies',
  templateUrl: './popular-movies.component.html',
  styleUrls: ['./popular-movies.component.css']
})
export class PopularMoviesComponent implements OnInit {
  movies: Movie[];
  moviesGroups: Movie[][];
  moviesPerGroup: number;

  constructor(private apiService: ApiService) {
    this.movies = [];
    this.moviesGroups = [];
    this.moviesPerGroup = 6;
    // this.moviesPerGroup = 1;
  }

  ngOnInit(): void {
    this.apiService.getPopularMovies()
      .subscribe(movies => {
        this.movies = movies;
        this.moviesGroups = [];
        let moviesGroup = [];
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.movies.length; i++) {
          if (i % this.moviesPerGroup === 0 && moviesGroup.length > 0) {
            this.moviesGroups.push(moviesGroup);
            moviesGroup = [];
          }
          moviesGroup.push(this.movies[i]);
        }
        if (moviesGroup.length > 0) {
          this.moviesGroups.push(moviesGroup);
        }
      });
  }

}
