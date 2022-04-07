const express = require('express');
const service = require('./service')
const cors = require('cors')
const path = require('path');

const app = express();
app.use(cors());

app.use('/', express.static(path.join(__dirname, 'dist/bunnyxt-tmdb-frontend')))

// app.get('/', (req, res) => {
//   res.status(200).send('Hello, world!').end();
// });

// 4.1.1 Multi-Search Endpoint to search for both Movies and TV shows
app.get('/api/search', (req, res) => {
  const { query } = req.query;
  service.search(query)
    .then(response => {
      const searchResults = [];
      for (const result of response.data.results) {
        if (result.media_type === 'person') {
          continue;
        }
        searchResults.push({
          id: result.id,
          name: result.media_type === 'movie' ? result.title : result.name,
          backdrop_path: result.backdrop_path === null
            ? null
            : `https://image.tmdb.org/t/p/w500${result.backdrop_path}`,
          media_type: result.media_type,
        });
      }
      res.json(searchResults);
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

// for search bar
app.get('/api/search_for_search_bar', (req, res) => {
  const { query } = req.query;
  if (!query || query.length < 2) {
    res.json([]);
  }
  service.search(query)
    .then(response => {
      const searchResults = [];
      let counter = 0;
      for (const result of response.data.results) {
        if (result.media_type === 'person') {
          continue;
        }
        if (result.backdrop_path === null) {
          continue;
        }
        searchResults.push({
          id: result.id,
          name: result.media_type === 'movie' ? result.title : result.name,
          backdrop_path: result.backdrop_path === null
            ? null
            : `https://image.tmdb.org/t/p/w500${result.backdrop_path}`,
          media_type: result.media_type,
        });
        counter += 1;
        if (counter >= 7) {
          break;
        }
      }
      res.json(searchResults);
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

// 4.1.2 Trending Movies Endpoint
app.get('/api/trending/movies', (req, res) => {
  service.getTrendingMovies()
    .then(response => {
      const trendingMovies = [];
      for (const result of response.data.results) {
        trendingMovies.push({
          id: result.id,
          title: result.title,
          poster_path: result.poster_path === null
            ? null
            : `https://image.tmdb.org/t/p/w500${result.poster_path}`,
        });
      }
      res.json(trendingMovies);
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

// 4.1.3 Top-Rated Movies Endpoint
app.get('/api/top_rated/movies', (req, res) => {
  service.getTopRatedMovies()
    .then(response => {
      const topRatedMovies = [];
      for (const result of response.data.results) {
        topRatedMovies.push({
          id: result.id,
          title: result.title,
          poster_path: result.poster_path === null
            ? null
            : `https://image.tmdb.org/t/p/w500${result.poster_path}`,
        });
      }
      res.json(topRatedMovies);
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

// 4.1.4 Currently playing Movies Endpoint
app.get('/api/current_playing/movies', (req, res) => {
  service.getCurrentPlayingMovies()
    .then(response => {
      const currentPlayingMovies = [];
      for (const result of response.data.results) {
        // if (result.poster_path === null) {+
        if (result.backdrop_path === null) {
          continue;
        }
        currentPlayingMovies.push({
          id: result.id,
          title: result.title,
          // poster_path: `https://image.tmdb.org/t/p/w500${result.poster_path}`,
          backdrop_path: `https://image.tmdb.org/t/p/original${result.backdrop_path}`,
        });
      }
      res.json(currentPlayingMovies);
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

// 4.1.5 Popular Movies Endpoint
app.get('/api/popular/movies', (req, res) => {
  service.getPopularMovies()
    .then(response => {
      const popularMovies = [];
      for (const result of response.data.results) {
        popularMovies.push({
          id: result.id,
          title: result.title,
          poster_path: result.poster_path === null
            ? null
            : `https://image.tmdb.org/t/p/w500${result.poster_path}`,
        });
      }
      res.json(popularMovies);
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

// 4.1.6 Recommended Movies Endpoint
app.get('/api/movies/:id/recommendations', (req, res) => {
  const { id } = req.params;
  service.getRecommendedMovies(id)
    .then(response => {
      const recommendedMovies = [];
      for (const result of response.data.results) {
        recommendedMovies.push({
          id: result.id,
          title: result.title,
          poster_path: result.poster_path === null
            ? null
            : `https://image.tmdb.org/t/p/w500${result.poster_path}`,
        });
      }
      res.json(recommendedMovies);
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

// 4.1.7 Similar Movies Endpoint
app.get('/api/movies/:id/similar', (req, res) => {
  const { id } = req.params;
  service.getSimilarMovies(id)
    .then(response => {
      const similarMovies = [];
      for (const result of response.data.results) {
        similarMovies.push({
          id: result.id,
          title: result.title,
          poster_path: result.poster_path === null
            ? null
            : `https://image.tmdb.org/t/p/w500${result.poster_path}`,
        });
      }
      res.json(similarMovies);
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

// 4.1.8 Movies Video Endpoint
app.get('/api/movies/:id/videos', (req, res) => {
  const { id } = req.params;
  service.getMovieVideos(id)
    .then(response => {
      const movieVideos = [];
      for (const result of response.data.results) {
        movieVideos.push({
          site: result.site,
          type: result.type,
          name: result.name,
          key: result.key === null
            ? null
            : `https://www.youtube.com/watch?v=${result.key}`,
        });
      }
      res.json(movieVideos);
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

// 4.1.9 Movie Details Endpoint
app.get('/api/movies/:id', (req, res) => {
  const { id } = req.params;
  service.getMovieDetail(id)
    .then(response => {
      const movieDetail = {
        title: response.data.title,
        genres: response.data.genres,
        spoken_languages: response.data.spoken_languages,
        release_date: response.data.release_date,
        runtime: response.data.runtime,
        overview: response.data.overview,
        vote_average: response.data.vote_average,
        tagline: response.data.tagline,
        poster_path: response.data.poster_path === null
          ? null
          : `https://image.tmdb.org/t/p/w500${response.data.poster_path}`,
      };
      res.json(movieDetail);
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

// 4.1.10 Movie Reviews Endpoint
app.get('/api/movies/:id/reviews', (req, res) => {
  const { id } = req.params;
  service.getMovieReviews(id)
    .then(response => {
      const movieReviews = [];
      for (const result of response.data.results) {
        movieReviews.push({
          author: result.author,
          content: result.content,
          created_at: result.created_at,
          url: result.url,
          rating: result.author_details.rating === null
            ? 0
            : result.author_details.rating,
          avatar_path: result.author_details.avatar_path === null
            ? null
            : result.author_details.avatar_path.startsWith('/http')
              ? result.author_details.avatar_path.substring(1)
              :`https://image.tmdb.org/t/p/original${result.author_details.avatar_path}`,
        });
      }
      res.json(movieReviews);
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

// 4.1.11 Movie Cast Endpoint
app.get('/api/movies/:id/casts', (req, res) => {
  const { id } = req.params;
  service.getMovieCredits(id)
    .then(response => {
      const movieCasts = [];
      for (const result of response.data.cast) {
        if (result.profile_path === null) {
          // If profile picture is not available, don’t display those cast members.
          continue;
        }
        movieCasts.push({
          id: result.id,
          name: result.name,
          character: result.character,
          profile_path: `https://image.tmdb.org/t/p/w500${result.profile_path}`,
        });
      }
      res.json(movieCasts);
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

// 4.1.12 Trending TV Shows Endpoint
app.get('/api/trending/tvs', (req, res) => {
  service.getTrendingTvs()
    .then(response => {
      const trendingTvs = [];
      for (const result of response.data.results) {
        trendingTvs.push({
          id: result.id,
          name: result.name,
          poster_path: result.poster_path === null
            ? null
            : `https://image.tmdb.org/t/p/w500${result.poster_path}`,
        });
      }
      res.json(trendingTvs);
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

// 4.1.13 Top-Rated TV shows Endpoint
app.get('/api/top_rated/tvs', (req, res) => {
  service.getTopRatedTvs()
    .then(response => {
      const topRatedTvs = [];
      for (const result of response.data.results) {
        topRatedTvs.push({
          id: result.id,
          name: result.name,
          poster_path: result.poster_path === null
            ? null
            : `https://image.tmdb.org/t/p/w500${result.poster_path}`,
        });
      }
      res.json(topRatedTvs);
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

// 4.1.14 Popular TV shows Endpoint
app.get('/api/popular/tvs', (req, res) => {
  service.getPopularTvs()
    .then(response => {
      const popularTvs = [];
      for (const result of response.data.results) {
        popularTvs.push({
          id: result.id,
          name: result.name,
          poster_path: result.poster_path === null
            ? null
            : `https://image.tmdb.org/t/p/w500${result.poster_path}`,
        });
      }
      res.json(popularTvs);
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

// 4.1.15 Recommended TV shows Endpoint
app.get('/api/tvs/:id/recommendations', (req, res) => {
  const { id } = req.params;
  service.getRecommendedTvs(id)
    .then(response => {
      const recommendedTvs = [];
      for (const result of response.data.results) {
        recommendedTvs.push({
          id: result.id,
          name: result.name,
          poster_path: result.poster_path === null
            ? null
            : `https://image.tmdb.org/t/p/w500${result.poster_path}`,
        });
      }
      res.json(recommendedTvs);
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

// 4.1.16 Similar TV shows Endpoint
app.get('/api/tvs/:id/similar', (req, res) => {
  const { id } = req.params;
  service.getSimilarTvs(id)
    .then(response => {
      const similarTvs = [];
      for (const result of response.data.results) {
        similarTvs.push({
          id: result.id,
          name: result.name,
          poster_path: result.poster_path === null
            ? null
            : `https://image.tmdb.org/t/p/w500${result.poster_path}`,
        });
      }
      res.json(similarTvs);
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

// 4.1.17 TV show Video Endpoint
app.get('/api/tvs/:id/videos', (req, res) => {
  const { id } = req.params;
  service.getMovieTvs(id)
    .then(response => {
      const tvVideos = [];
      for (const result of response.data.results) {
        tvVideos.push({
          site: result.site,
          type: result.type,
          name: result.name,
          key: result.key === null
            ? null
            : `https://www.youtube.com/watch?v=${result.key}`,
        });
      }
      res.json(tvVideos);
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

// 4.1.18 TV show Details Endpoint
app.get('/api/tvs/:id', (req, res) => {
  const { id } = req.params;
  service.getTvDetail(id)
    .then(response => {
      const tvDetail = {
        // title: response.data.title,  // really title, not name?
        name: response.data.name,
        genres: response.data.genres,
        spoken_languages: response.data.spoken_languages,
        first_air_date: response.data.first_air_date,
        episode_run_time: response.data.episode_run_time,
        overview: response.data.overview,
        vote_average: response.data.vote_average,
        tagline: response.data.tagline,
        poster_path: response.data.poster_path === null
          ? null
          : `https://image.tmdb.org/t/p/w500${response.data.poster_path}`,
      };
      res.json(tvDetail);
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

// 4.1.19 TV show Reviews Endpoint
app.get('/api/tvs/:id/reviews', (req, res) => {
  const { id } = req.params;
  service.getTvReviews(id)
    .then(response => {
      const tvReviews = [];
      for (const result of response.data.results) {
        tvReviews.push({
          author: result.author,
          content: result.content,
          created_at: result.created_at,
          url: result.url,
          rating: result.author_details.rating === null
            ? 0
            : result.author_details.rating,
          avatar_path: result.author_details.avatar_path === null
            ? null
            : result.author_details.avatar_path.startsWith('/http')
              ? result.author_details.avatar_path.substring(1)
              :`https://image.tmdb.org/t/p/original${result.author_details.avatar_path}`,
        });
      }
      res.json(tvReviews);
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

// 4.1.20 TV show Cast Endpoint
app.get('/api/tvs/:id/casts', (req, res) => {
  const { id } = req.params;
  service.getTvCredits(id)
    .then(response => {
      const tvCasts = [];
      for (const result of response.data.cast) {
        if (result.profile_path === null) {
          // If profile picture is not available, don’t display those cast members.
          continue;
        }
        tvCasts.push({
          id: result.id,
          name: result.name,
          character: result.character,
          profile_path: `https://image.tmdb.org/t/p/w500${result.profile_path}`,
        });
      }
      res.json(tvCasts);
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

// 4.1.21 Cast Details Endpoint
app.get('/api/persons/:id', (req, res) => {
  const { id } = req.params;
  service.getPersonDetail(id)
    .then(response => {
      const personDetail = {
        birthday: response.data.birthday,
        gender: response.data.gender,
        name: response.data.name,
        homepage: response.data.homepage,
        also_known_as: response.data.also_known_as,
        known_for_department: response.data.known_for_department,
        biography: response.data.biography,
        place_of_birth: response.data.place_of_birth,
      };
      res.json(personDetail);
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

// 4.1.22 Cast external ids Endpoint
app.get('/api/persons/:id/external_ids', (req, res) => {
  const { id } = req.params;
  service.getPersonExternalIds(id)
    .then(response => {
      const personExternalIds = {
        imdb_id: response.data.imdb_id,
        facebook_id: response.data.facebook_id,
        instagram_id: response.data.instagram_id,
        twitter_id: response.data.twitter_id,
      };
      res.json(personExternalIds);
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

module.exports = app;
