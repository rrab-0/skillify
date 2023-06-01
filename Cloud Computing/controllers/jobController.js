'use strict';

const db = require('../db');
const Job = require('../models/job');
// firestore firebase
const {
  getFirestore,
  getDoc,
  collection,
  query,
  where,
  orderBy,
  getDocs,
} = require('firebase/firestore');
const { doc, setDoc } = require('firebase/firestore');
const actualDb = getFirestore(db);
// uuid
const { v4: uuidv4 } = require('uuid');
// variable generates uuidv4 once

const addJob = async (req, res) => {
  try {
    const uuid = uuidv4();
    const data = req.body;
    const jobDoc = doc(actualDb, 'jobs', uuid);
    await setDoc(jobDoc, data);

    res.redirect(`/job/get-job-id/${uuid}`);
    console.log(`${uuid} record saved`);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getJobId = async (req, res) => {
  try {
    const jobId = req.params.id;
    const jobIdDocRef = doc(actualDb, 'jobs', jobId);
    const jobData = await getDoc(jobIdDocRef);

    if (!jobData.exists()) {
      res.status(404).send('Job not found');
    } else {
      const jobWithId = {
        id: jobId,
        ...jobData.data(),
      };
      res.send(jobWithId);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllJobOfOneUser = async (req, res) => {
  try {
    const userIdOfJob = req.params.userId;
    const allJobCollection = collection(actualDb, 'jobs');
    const allJobOfOneUserQuery = query(
      allJobCollection,
      where('userId', '==', userIdOfJob)
    );

    const allJobOfOneUserSnapshot = await getDocs(allJobOfOneUserQuery);

    allJobOfOneUserSnapshot.forEach((doc) => {
      res.send(doc.data());
    });
    // if (!allJobOfOneUserSnapshot.exists()) {
    //   res.status(404).send('No jobs found');
    // } else {
    //   res.send(...allJobOfOneUserSnapshot.data());
    // }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addJob,
  getJobId,
  getAllJobOfOneUser,
};
