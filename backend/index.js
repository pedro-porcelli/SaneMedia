// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import fetch from 'fetch';

//init express
const exp = express(); 

exp.use(cors());

exp.use(express.json());

exp.use(express.urlencoded({ extended: true }));


// public vars
var PORT = 9955;
var HOST = 'localhost'

exp.post('/addUsr', (req, res) => {

  const { email } = req.body;
  const { password } = req.body;

  if(!email) {
    res.status(400).json({
      "error": "400: Missing parameters!"
    });
  }

  res.json({
    "email": email,
    "password": password
  });
});

exp.listen(PORT, console.log("Listening on port " + PORT));

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnCDscN1KDWzMAejS2f3F3DvbtSJgbJ44",
  authDomain: "sanemedia-b4ee1.firebaseapp.com",
  projectId: "sanemedia-b4ee1",
  storageBucket: "sanemedia-b4ee1.appspot.com",
  messagingSenderId: "811825965256",
  appId: "1:811825965256:web:376a8b8db300640ec51dfd",
  measurementId: "G-YN60PP9H50"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//write data ro realtime db

function writeData(username, password) {
  const db = getDatabase();
  const refrence = ref(db, 'users/' + username);

  set(refrence, {
    username: username,
    password: password
  });
}


// Testing
