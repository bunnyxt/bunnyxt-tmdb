const axios = require('axios');

const tmdbApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
});

const API_KEY = process.env.API_KEY;

const search = function(query) {
  return tmdbApi.get('search/multi', {
    params: {
      api_key: API_KEY,
      language: 'en-US',
      query,
    },
  });
};

const getTrendingMovies = function () {
  return tmdbApi.get('trending/movie/day', {
    params: {
      api_key: API_KEY,
    },
  });
};

const getTopRatedMovies = function () {
  return tmdbApi.get('movie/top_rated', {
    params: {
      api_key: API_KEY,
      language: 'en-US',
      page: 1,
    },
  });
};

const getCurrentPlayingMovies = function () {
  return tmdbApi.get('movie/now_playing', {
    params: {
      api_key: API_KEY,
      language: 'en-US',
      page: 1,
    },
  });
};

const getPopularMovies = function () {
  return tmdbApi.get('movie/popular', {
    params: {
      api_key: API_KEY,
      language: 'en-US',
      page: 1,
    },
  });
};

const getRecommendedMovies = function (id) {
  return tmdbApi.get(`movie/${id}/recommendations`, {
    params: {
      api_key: API_KEY,
      language: 'en-US',
      page: 1,
    },
  });
};

const getSimilarMovies = function (id) {
  return tmdbApi.get(`movie/${id}/similar`, {
    params: {
      api_key: API_KEY,
      language: 'en-US',
      page: 1,
    },
  });
};

const getMovieVideos = function (id) {
  return tmdbApi.get(`movie/${id}/videos`, {
    params: {
      api_key: API_KEY,
      language: 'en-US',
      page: 1,
    },
  });
};

const getMovieDetail = function (id) {
  return tmdbApi.get(`movie/${id}`, {
    params: {
      api_key: API_KEY,
      language: 'en-US',
      page: 1,
    },
  });
};

const getMovieReviews = function (id) {
  return tmdbApi.get(`movie/${id}/reviews`, {
    params: {
      api_key: API_KEY,
      language: 'en-US',
      page: 1,
    },
  });
};

const getMovieCredits = function (id) {
  return tmdbApi.get(`movie/${id}/credits`, {
    params: {
      api_key: API_KEY,
      language: 'en-US',
      page: 1,
    },
  });
};

const getTrendingTvs = function () {
  return tmdbApi.get('trending/tv/day', {
    params: {
      api_key: API_KEY,
    },
  });
};

const getTopRatedTvs = function () {
  return tmdbApi.get('tv/top_rated', {
    params: {
      api_key: API_KEY,
      language: 'en-US',
      page: 1,
    },
  });
};

const getPopularTvs = function () {
  return tmdbApi.get('tv/popular', {
    params: {
      api_key: API_KEY,
      language: 'en-US',
      page: 1,
    },
  });
};

const getRecommendedTvs = function (id) {
  return tmdbApi.get(`tv/${id}/recommendations`, {
    params: {
      api_key: API_KEY,
      language: 'en-US',
      page: 1,
    },
  });
};

const getSimilarTvs = function (id) {
  return tmdbApi.get(`tv/${id}/similar`, {
    params: {
      api_key: API_KEY,
      language: 'en-US',
      page: 1,
    },
  });
};

const getMovieTvs = function (id) {
  return tmdbApi.get(`tv/${id}/videos`, {
    params: {
      api_key: API_KEY,
      language: 'en-US',
      page: 1,
    },
  });
};

const getTvDetail = function (id) {
  return tmdbApi.get(`tv/${id}`, {
    params: {
      api_key: API_KEY,
      language: 'en-US',
      page: 1,
    },
  });
};

const getTvReviews = function (id) {
  return tmdbApi.get(`tv/${id}/reviews`, {
    params: {
      api_key: API_KEY,
      language: 'en-US',
      page: 1,
    },
  });
};

const getTvCredits = function (id) {
  return tmdbApi.get(`tv/${id}/credits`, {
    params: {
      api_key: API_KEY,
      language: 'en-US',
      page: 1,
    },
  });
};

const getPersonDetail = function (id) {
  return tmdbApi.get(`person/${id}`, {
    params: {
      api_key: API_KEY,
      language: 'en-US',
      page: 1,
    },
  });
};

const getPersonExternalIds = function (id) {
  return tmdbApi.get(`person/${id}/external_ids`, {
    params: {
      api_key: API_KEY,
      language: 'en-US',
      page: 1,
    },
  });
};

module.exports = {
  tmdbApi,
  search,
  getTrendingMovies,
  getTopRatedMovies,
  getCurrentPlayingMovies,
  getPopularMovies,
  getRecommendedMovies,
  getSimilarMovies,
  getMovieVideos,
  getMovieDetail,
  getMovieReviews,
  getMovieCredits,
  getTrendingTvs,
  getTopRatedTvs,
  getPopularTvs,
  getRecommendedTvs,
  getSimilarTvs,
  getMovieTvs,
  getTvDetail,
  getTvReviews,
  getTvCredits,
  getPersonDetail,
  getPersonExternalIds,
};
