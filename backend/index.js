// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { write } from "fs";
import express from 'express';
import bodyParser from 'body-parser';

var exp = express();
var username = "";
var password = "";
const PORT = 3333;

exp.use( bodyParser.json() );

exp.listen(PORT, () => console.log("alive on http://localhost:3333"))

exp.post('/addUser', function (req, res) {
  username = req.body;
  password = req.body;

  if (!username || !password || !username && !password) {
    res.status(418).send({message: "ERROR: Missing Information!"})
  }
})

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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

function writeData(username, password) {
  const db = getDatabase();
  const refrence = ref(db, 'users/' + username);

  set(refrence, {
    username: username,
    password: password
  });
}

writeData("Nick", "Rick");