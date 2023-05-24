'use strict';

const firebase = require('../db');
const User = require('../models/user');
const { getFirestore } = require('firebase/firestore');

const addUser = async (req, res, next) => {
  try {
    const data = req.body;
    await getFirestore.collection('users').doc().set(data);
    res.send('Record saved successfuly');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addUser,
};
