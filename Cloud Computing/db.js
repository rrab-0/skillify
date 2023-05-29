const { initializeApp } = require('firebase/app');
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

const db = initializeApp(firebaseConfig);

module.exports = db;
