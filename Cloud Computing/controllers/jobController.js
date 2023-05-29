'use strict';

const db = require('../db');
const Job = require('../models/job');

// firestore firebase
const { getFirestore } = require('firebase/firestore');
const { doc, setDoc } = require('firebase/firestore');

const actualDb = getFirestore(db);

// uuid
const { v4: uuidv4 } = require('uuid');

const addJob = async (req, res) => {
  try {
    const data = req.body;
    const response = await setDoc(doc(actualDb, 'jobs', uuidv4()), data);
    console.log(`record saved ${response}`);
    res.send(`record saved successfuly`);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addJob,
};
