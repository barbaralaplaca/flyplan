require("dotenv").config();

const {
  getFirestore,
  doc,
  setDoc,
  initializeFirestore,
  firebaseApp
} = require("firebase/firestore");
const { initializeApp } = require("firebase/app");
require("dotenv").config();

export const firebaseConfig = {
  apiKey: process.env.PRICE-BACKEND-API_KEY,
  authDomain: `flyplan.firebaseapp.com`,
  // The value of `databaseURL` depends on the location of the database
  databaseURL: `https://${process.env.PRICE-BACKEND-DATABASE_NAME}-default-rtdb.europe-west1.firebasedatabase.app`,
  projectId: process.env.PRICE-BACKEND-PROJECT_ID,
  storageBucket: `${process.env.PRICE-BACKEND-PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.PRICE-BACKEND-SENDER_ID,
  appId: process.env.PRICE-BACKEND-APP_ID,
};