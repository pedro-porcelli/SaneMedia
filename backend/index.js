// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import express from 'express';
import cors from 'cors';
import crypto from 'crypto';

//init express
const exp = express(); 

exp.use(cors());

exp.use(express.json());

exp.use(express.urlencoded({ extended: true }));


// public vars
var PORT = 9955;
var HOST = 'localhost'
//handle post reqs

exp.post('/addUsr', (req, res) => {

  const { username } = req.body;
  const { password } = req.body;

  if(!username || !password || !username && !password) {
    res.status(400).json({
      "error": "Missing parameters!"
    });
  }

  console.log("input: " + username);

  const user = getUser(username);

  if (!user){
    res.status(400).json({
      "error": "User already exists."
    });
    return;
  }

  postUser(username, password);

  res.status(200).json({
    "username": username,
    "password": password
  });

});

exp.listen(PORT);

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

function postUser(username, password) {
  const db = getDatabase();
  const refx = ref(db, 'users/' + hash(username));

  set(refx, {
    username: username,
    password: hash(password)
  });
}

function getUser(username) {
  console.log("username: " + username);
  const db = getDatabase();
  const refrence = ref(db, 'users/' + hash(username));

  onValue(refrence, (snapshot) => {
    let data = snapshot.val();
    console.log(data);
  });
}


function hash(value){
  return crypto.createHash('sha1').update(value).digest('hex');
}