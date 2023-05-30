'use strict';

const db = require('../db');
const User = require('../models/user');
// firestore firebase
const {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
} = require('firebase/firestore');
const actualDb = getFirestore(db);
// uuid
const { v4: uuidv4 } = require('uuid');
// variable generates uuidv4 once
const uuid = uuidv4();

const addUser = async (req, res) => {
  try {
    const data = req.body;

    const userDoc = doc(actualDb, 'users', uuid);
    await setDoc(userDoc, data);

    res.redirect('/user/get-user-id');
    console.log(`${uuid} record saved`);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getUserId = async (res) => {
  try {
    const userIdDocRef = doc(actualDb, 'users', uuid);
    const userData = await getDoc(userIdDocRef);
    res.send(userData);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllUser = async (req, res) => {
  try {
    const allUserDoc = collection(actualDb, 'users');
    const allUserData = await getDocs(allUserDoc);
    res.send(allUserData);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addUser,
  getUserId,
  getAllUser,
};
