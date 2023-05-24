// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBPtZDpjkOXybecsrWYbk5t-t_QejagxUA',
  authDomain: 'bangkit-skillify-app.firebaseapp.com',
  projectId: 'bangkit-skillify-app',
  storageBucket: 'bangkit-skillify-app.appspot.com',
  messagingSenderId: '472393776998',
  appId: '1:472393776998:web:8d58043de9190413b5d2a7',
  measurementId: 'G-7D7D353JGS',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
