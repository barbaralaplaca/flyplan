require("dotenv").config();

export const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: `${process.env.PROJECT_ID}.firebaseapp.com`,
  // The value of `databaseURL` depends on the location of the database
  databaseURL: `https://${process.env.DATABASE_NAME}-default-rtdb.europe-west1.firebasedatabase.app`,
  projectId: process.env.PROJECT_ID,
  storageBucket: `${process.env.PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.SENDER_ID,
  appId: process.env.APP_ID,
};
