'use strict';

const db = require('../db');
const User = require('../models/user');
const { getFirestore, collection } = require('firebase/firestore');
const { doc, setDoc } = require('firebase/firestore');
const actualDb = getFirestore(db);
// const dbs = firebase.firestore();

const addUser = async (req, res, next) => {
  try {
    const data = req.body;
    // await collection('users').doc('users_data'.toString()).set(data);
    await setDoc(doc(actualDb, 'users', 'users-data'), data);
    res.send('Record saved successfuly');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addUser,
};
