# bunnyxt-tmdb

## Introduction

This project is built for the third homework of USC CSCI-571 2021 Spring Session. In this homework, students are required to build a film database webside powered by [TMDB](https://www.themoviedb.org/) API. According to the instructions, students must implement several backend APIs via Node.js and SPA frontend via AngularJS. Finally, the website should be deployed to the cloud platform. This repository contains my submission of this homework, which could be access at [https://bunnyxt-tmdb-f6573ad0e0f4.herokuapp.com](https://bunnyxt-tmdb-f6573ad0e0f4.herokuapp.com).

## Features

- Built responsive Single Page Application (SPA) based on AngularJS with TypeScript.
- Via the frontend, users can browse latest trending films and tv shows, search items via keywords, check detailed info page, etc.
- Implemented Continue Watching list via localStorage, which will store visited pages.
- Constructed watchlist via localStorage, which will contains films or tvs marked by users.
- Developed Node.js backend with Express web application framework.
- The backend works as a proxy, which means that it would receive requests from frontend, then repost request with API_KEY to TMDB API, receive response from TMDB, then return back to frontend.
- Deployed the project to Heroku, URL: [https://bunnyxt-tmdb-f6573ad0e0f4.herokuapp.com](https://bunnyxt-tmdb-f6573ad0e0f4.herokuapp.com).

## Development

### TMDB API KEY

This project is powered by TMDB API. To start develop, we need to have a TMDB API KEY. You can request an API key by logging in to your account on TMDB and clicking the "API" link in the left hand side bar of your account page. URL: [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)

### Backend

To start deployment of frontend, firstly, we need to install dependencies.

```shell
npm install
```

After that, we can start backend service. The backend service requires TMDB API we requested in the previous step. We need to set API_KEY environment variable to start backend service.

```shell
API_KEY=<your-api-key> node app.js
```

By default, the backend service will start at [http://localhost:8080](http://localhost:8080).

### Frontend

To start deployment of frontend, firstly, we need to install dependencies.

```shell
npm install
```

After that, the frontend can be started via the following script.

```shell
npm start
```

The frontend will be started at [http://localhost:4200](http://localhost:4200) by default. The frontend will visit backend via [http://localhost:8080](http://localhost:8080) by default. Of course, you can change it via edit `rootUrl` in the file `frontend/src/app/api/api.service.ts`.

## Deployment

### Step 1: Build frontend

To make sure frontend would visit backend apis correctly, please edit `rootUrl` in the file `frontend/src/app/api/api.service.ts` first. For example, in this project, we will deploy frontend and backend in the same root URL, so we set `rootUrl = ''`.

```shell
cd frontend && npm build
```

After a while, the built frontend code would be stored in `frontend/dist` folder.

### Step 2: Move built frontend to backend

```shell
cd backend && cp -r ../frontend/dist .
```

The backend will use `backend/dist/bunnyxt-tmdb-frontend` as built frontend page resource. When you visit the root page of the backend service, the browser will display frontend content.

### Step 3: Deploy to Heroku

1. Create a [new Heroku app](https://dashboard.heroku.com/new-app), then push project code for deployment.
   1. Personally, I would recommend to connect the Heroku app to GitHub repo, then enable auto deployment from main branch.
2. Set up config vars. Go to Heroku app dashboard, switch to 'Settings' tab, then click 'Reveal Config Vars' button.
   1. Set `NPM_CONFIG_PRODUCTION` to `false`. This is to enable Heroku to install devDependencies during building process.
   2. Set `API_KEY` to the TMDB API KEY fetched before.

After all, you can visit [https://bunnyxt-tmdb-f6573ad0e0f4.herokuapp.com](https://bunnyxt-tmdb-f6573ad0e0f4.herokuapp.com) to see the website. Deploy success!

## Disclaimer

- This is just a naive implement and only call TMDB API at low frequency. It only obtains public accessible data (no personal info or paid content collected and distributed). DO NOT ABUSE TMDB API!!!
- GitHub Repo: [bunnyxt/bunnyxt-tmdb](https://github.com/bunnyxt/bunnyxt-tmdb)
- Author: [bunnyxt](https://github.com/bunnyxt)
- License: [MIT](LICENSE)
