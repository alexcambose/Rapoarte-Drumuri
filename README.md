# Rapoarte-Drumuri
**Rapoarte Drumuri** (Roads Reports) is meant to help drivers who are tired of unexpected events on Romanian roads. With this app anyone can report a closed, broken, in repair or dangerous road so that other drivers are aware of the problem.

### Links
[Google Play](https://play.google.com/store/apps/details?id=com.rapoarte_drumuri)

### Docs
This app is made out of two parts
1. The front-end side
2. The back-end side

# Frontend

### Installation
Before you continue to read, the front-end side of this application is based on [react-native](https://facebook.github.io/react-native/) so make sure you read and follow their documentaion on how to set up and install react-native.

```
cd frontend/App && npm install
```

You need to have the app installed on your device or emulator
```
react-native run-android
```

Start the development server
```
npm start
```
### Connecting to the server
In order for the app to be useful and display the reports it needs to know where the backend server is.
`app/constants.js` contains the `domain`, `googleAPIkey` and `googleMapsGeocodingAPIkey` that needs to be replaced. 

# Backend
The back-end side is an API based on nodejs [express](https://expressjs.com/) server, [jwt](https://jwt.io/) for user authentication and [mongoose](http://mongoosejs.com/) for mongo database.

### Installation
```
cd backend && npm install
```
to start the server
```
node ./app/server.js
```
