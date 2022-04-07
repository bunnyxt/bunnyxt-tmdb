# bunnyxt-tmdb

## Introduction

This project is the third homework of USC CSCI-571 2021 Spring Session. In this project, students are required to build a film database webside powered by [TMDB](https://www.themoviedb.org/) api. According to the instructions, students must implement several backend APIs via Node.js and SPA frontend via AngularJS. Finally, the project is deployed to Azure cloud platform. This repo contains my submission of this homework, which could be access at [https://bunnyxt-tmdb.azurewebsites.net](https://bunnyxt-tmdb.azurewebsites.net).

## Features

- Built Single Page Application (SPA) based on AngularJS with TypeScript.
- Via the frontend, users can browse latest trending films and tv shows, search items via keywords, check detailed info page, etc.
- Implemented Continue Watching list via localStorage.
- Developed Node.js backend with Express web application framework.
- The backend works as a proxy, which means that it would receive requests from frontend, then repost request with API_KEY to TMDB API, receive response from TMDB, then return back to frontend.
- Deployed the project to Azure, URL: [https://bunnyxt-tmdb.azurewebsites.net](https://bunnyxt-tmdb.azurewebsites.net).

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

The backend will use `backend/dist/bunnyxt-tmdb-frontend` as built frontend paage resource. When you visit the root page of the backend service, the browser will display frontend content.

### Step 3: Deploy to Azure

Register an Azure account first, then refer [Create a Node.js web app in Azure](https://docs.microsoft.com/en-us/azure/app-service/quickstart-nodejs?pivots=development-environment-cli&tabs=linux) tutorial to upload all content in the `backend` folder, then start server.

In my deployment, I created an app called `bunnyxt-tmdb`. Then, I can use command line interface to deploy. Of course, I need to download this command line interface and login first.

```shell
cd backend
az webapp up --name bunnyxt-tmdb
```

What's more, to provide `API_KEY` environment variable to Azure, please refer [How To Pass Environment Variables In Serverless NodeJS Azure Functions](https://medium.com/bb-tutorials-and-thoughts/how-to-pass-environment-variables-in-nodejs-azure-functions-4713a9cb3f16) this article, go to `Settings -> Configuration -> Application settings`, add new application setting with name `API_KEY` and your API KEY string as value.

After all, you can visit [https://bunnyxt-tmdb.azurewebsites.net/](https://bunnyxt-tmdb.azurewebsites.net/) to see the website. Deploy success!

## Disclaimer

- This is just a naive implement and only call TMDB API at low frequency. It only obtains public accessible data (no personal info or paid content collected and distributed). DO NOT ABUSE TMDB API!!! 
- GitHub Repo: [bunnyxt/bunnyxt-tmdb](https://github.com/bunnyxt/bunnyxt-tmdb)
- Author: [bunnyxt](https://github.com/bunnyxt)
- License: [MIT](LICENSE)

