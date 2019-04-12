
<p align="center">
   <img width="500" src="https://user-images.githubusercontent.com/16007048/56063787-2b8aa800-5d68-11e9-8494-83198b675458.png">
 </p>
 
## Appengenie (App + Engine + Genie)
React + Redux Application to discover new Apps based on a given description

<p align="center">
   <img height="500" src="https://user-images.githubusercontent.com/16007048/56063900-7a384200-5d68-11e9-8a2c-8f41a808c651.jpg">
   <img height="500" src="https://user-images.githubusercontent.com/16007048/56064274-7822b300-5d69-11e9-8c1d-610b10f2c585.jpg">
   <img height="500" src="https://user-images.githubusercontent.com/16007048/56063903-7a384200-5d68-11e9-91b7-3c20fd4b7491.jpg">
</p>
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
