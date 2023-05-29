'use strict';

const db = require('../db');
const User = require('../models/user');

// firestore firebase
const { getFirestore } = require('firebase/firestore');
const { doc, setDoc } = require('firebase/firestore');

const actualDb = getFirestore(db);

// uuid
const { v4: uuidv4 } = require('uuid');

const addUser = async (req, res) => {
  try {
    const data = req.body;
    await setDoc(doc(actualDb, 'users', uuidv4()), data);
    console.log('record saved');
    res.send('record saved successfuly');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getUser = async (req, res) => {
  try {
    res.send('user datas');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addUser,
  getUser,
};
