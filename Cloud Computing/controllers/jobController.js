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
      const data = jobData.data();
      const jobWithId = {
        id: jobId,
        userId: data.userId,
        jobTitle: data.jobTitle,
        description: data.description,
        qualifications: data.qualifications,
        companyName: data.companyName,
        address: data.address,
        contacts: data.contacts,
      };
      res.send(jobWithId);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllJobOfOneUser = async (req, res) => {
  try {
    // const userIdOfJob = req.params.userId;
    const { userId } = req.query;
    const allJobCollection = collection(actualDb, 'jobs');
    const allJobOfOneUserQuery = query(
      allJobCollection,
      where('userId', '==', `${userId}`)
    );
    const allJobOfOneUserSnapshot = await getDocs(allJobOfOneUserQuery);

    let responseArr = [];
    allJobOfOneUserSnapshot.forEach((doc) => {
      const data = doc.data();
      const responseObject = {
        id: doc.id,
        userId: data.userId,
        jobTitle: data.jobTitle,
        description: data.description,
        qualifications: data.qualifications,
        companyName: data.companyName,
        address: data.address,
        contacts: data.contacts,
      };
      responseArr.push(responseObject);
    });
    res.send(responseArr);
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
