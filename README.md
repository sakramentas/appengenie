
# Appengenie
A repository of issues with app recommendations.


## Tools

- React
- React-Hot-Loader
- React-Redux
- React-Router
- React-Router-Redux
- Redux
- Redux-Thunk
- Redux-Devtools-Extension for Chrome
- Firebase SDK 3 with OAuth authentication
- Babel
- Reselect
- SASS
- Webpack
- Firebase


Quick Start
-----------

```shell
$ git clone https://github.com/sakramentas/appengenie.git
$ cd appengenie
$ npm install
$ npm start
```

#### Install firebase-tools:
```shell
$ npm install -g firebase-tools
```

## Deploying to Firebase
#### Prerequisites:
- firebase use default
- firebase deploy

#### Configure this app with your project-specific details:
```javascript
// .firebaserc

{
  "projects": {
    "default": "your-project-id"
  }
}
```
```javascript
// src/core/firebase/config.js


#### Build and deploy the app:
```shell
$ npm run build
$ firebase login
$ firebase use default
$ firebase deploy
```

By Lucas Sacramento
