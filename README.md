# BesTrip

Welcome to the BesTrip Server, the backend for the BesTrip Client Project.
It connects between the app and all server side logic, db, and external functionality.

This will allow the following functiontionality:

### Users

Will allow to get user information, create new user and get user trips.

### Sites

Allows you to search sites in the wanted aream get site information

### TripPlanner

Allows you to plan the trip according to your perfences

## Tech
* [node.js] - evented I/O for the backend

## Installation

 requires [Node.js](https://nodejs.org/) v4+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd BesTripServer
$ npm install 
$ node app
```

### Variables

This project won't run if you don't use the following env vars:

| Variable | Value |
| ------ | ------ |
| GGL_API_KEY | AIzaSyCZfV1JbQ6R4URxw3XPQAMyQrGhfNUoTTw |
| MONGO_CONN_STR | mongodb://admin:admin@ds137530.mlab.com:37530/bestrip |
| GGL_API_ADDR |  |


### Links

Here are some of our common links

| Plugin | README |
| ------ | ------ |
| Github | https://github.com/GalGend/BesTrip |
| Google Drive | https://drive.google.com/drive/u/0/folders/0BxlQ5nNEKtBRTWJQbFJjLTZUbFk |
| DB Server | https://mlab.com/databases/bestrip  |
