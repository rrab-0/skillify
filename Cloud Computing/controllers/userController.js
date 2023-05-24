'use strict';

const db = require('../db');
const User = require('../models/user');
const multer = require('multer');
// cloud storage firebase
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumeable,
} = require('firebase/storage');
// firestore firebase
const { getFirestore } = require('firebase/firestore');
const { doc, setDoc } = require('firebase/firestore');

const storage = getStorage();
const actualDb = getFirestore(db);
const upload = multer({ storage: multer.memoryStorage() });

const addUser = async (req, res) => {
  try {
    const data = req.body;
    await setDoc(doc(actualDb, 'users', 'users-data'), data);
    res.send('Record saved successfuly');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addUser,
};
