'use strict';

const db = require('../db');
const Job = require('../models/job');
// firestore firebase
const { getFirestore } = require('firebase/firestore');
const { doc, setDoc } = require('firebase/firestore');
const actualDb = getFirestore(db);
// uuid
const { v4: uuidv4 } = require('uuid');
// variable generates uuidv4 once
const uuid = uuidv4();

const addJob = async (req, res) => {
  try {
    const data = req.body;

    const jobDoc = doc(actualDb, 'jobs', uuid);
    await setDoc(jobDoc, data);

    res.send(`record with id ${uuid} saved successfuly`);
    console.log(`${uuid} record saved`);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addJob,
};
