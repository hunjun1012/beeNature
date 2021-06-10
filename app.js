const http = require('http');
const firebase = require('firebase');



const express = require('express');
const ejs = require('ejs');
const app = express();
// const db = require('./src/app/home/home.page')
const server = http.createServer(app);
const hostname = '127.0.0.1';
const port = 3000;

const config = {
    apiKey: "AIzaSyDBOvZUMUnEt6ANhOrx8KaNeiUwHenQpgY",
  authDomain: "smartfarm-a06f6.firebaseapp.com",
  databaseURL: "https://smartfarm-a06f6.firebaseio.com",
  projectId: "smartfarm-a06f6",
  storageBucket: "smartfarm-a06f6.appspot.com",
  messagingSenderId: "595981196058",
  appId: "1:595981196058:web:bf91dc7bdc01c4d717eaa3"
}

var beeSensor = 1;
firebase.initializeApp(config);


app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('index', {
    });
})



  




server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

