# The Pomo d'Oro

![Pomo d'Oro screencast](http://www.susukomaka.com/images/Pomo-d-oro-cast.gif)

A progressive web app for the [Pomodoro Technique](https://cirillocompany.de/pages/pomodoro-technique), built with Vue 2, Vuex and Firebase.

[Live app](https://pomodoro-13b15.firebaseapp.com)

## Features
- Google and Facebook authentication
- Inventory and Today views
- Github-style calendar heat map view for tracking productivity over time
- Progressive Web App (100/100 Lighthouse score)
  - App manifest
  - Service worker
  - Use of local storage for limited offline functionality

## Todos
- Add unit tests for vuex mutations and actions
- Add e2e tests
- Implement syncing between local storage and the Firebase database, for full-featured offline use

## Build Setup
> Before building and running this app, you will need to set up [Firebase](https://firebase.google.com) and update the config object in src/modules/firebase.js

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## License

MIT

- Project initiated with the vue-cli [Webpack template](http://vuejs-templates.github.io/webpack/).
- Tomato [icon](http://www.flaticon.com/free-icon/tomato_167283) by Freepik at www.flaticon.com.
