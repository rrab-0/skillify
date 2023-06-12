const { initializeApp } = require('firebase/app');
const dotenv = require('dotenv');
// const config = require('./config');

const firebaseConfig = {
  apiKey: 'AIzaSyBkGQQgqWmd3jDA9KirAM7yjwSWYXLCcUk',
  authDomain: 'bangkit-product-capstone.firebaseapp.com',
  projectId: 'bangkit-product-capstone',
  storageBucket: 'bangkit-product-capstone.appspot.com',
  messagingSenderId: '847064753196',
  appId: '1:847064753196:web:e0bacb903c6f3f95209d89',
  measurementId: 'G-QJ4X5G6Y39',
};

// const firebaseConfig = {
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID,
//   measurementId: process.env.MEASUREMENT_ID,
// };

const db = initializeApp(firebaseConfig);

module.exports = db;
