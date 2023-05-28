'use strict';

const db = require('../db');
const User = require('../models/user');

// firestore firebase
const { getFirestore } = require('firebase/firestore');
const { doc, setDoc } = require('firebase/firestore');

const actualDb = getFirestore(db);

const addUser = async (req, res) => {
  try {
    const data = req.body;
    await setDoc(doc(actualDb, 'users', 'users-data'), data);
    console.log('record saved');
    res.send('record saved successfuly');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addUser,
};
