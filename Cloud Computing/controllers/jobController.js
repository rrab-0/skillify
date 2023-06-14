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
  deleteDoc,
  serverTimestamp,
} = require('firebase/firestore');
const { doc, setDoc } = require('firebase/firestore');
const actualDb = getFirestore(db);
// uuid
const { v4: uuidv4 } = require('uuid');

const giveCurrentDateTime = () => {
  const today = new Date();
  const date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  const dateTime = date + ' ' + time;
  return dateTime;
};

const outputsML = async (req, res) => {
  try {
    //
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const addJob = async (req, res) => {
  try {
    const uuid = uuidv4();
    const currentDateTime = giveCurrentDateTime();
    const data = req.body;
    const jobDoc = doc(actualDb, 'jobs', uuid);
    await setDoc(jobDoc, { ...data, createdAt: currentDateTime });

    res.redirect(`/job/get-job-id/${uuid}`);
    console.log(`${currentDateTime} with id: ${uuid} record saved`);
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
        userId: data.userId,
        createdAt: data.createdAt,
        id: jobId,
        //
        jobTitle: data.jobTitle,
        description: data.description,
        qualifications: data.qualifications,
        companyName: data.companyName,
        address: data.address, // https://randomuser.me/
        phoneNumber: data.phoneNumber, // https://randomuser.me/
        email: data.email, // https://randomuser.me/
        website: data.website,
        linkedIn: data.linkedIn,
      };
      res.send(jobWithId);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllJobOfOneUser = async (req, res) => {
  try {
    const { userId } = req.query;
    const allJobCollection = collection(actualDb, 'jobs');
    const allJobOfOneUserQuery = query(
      allJobCollection,
      where('userId', '==', userId)
    );
    const allJobOfOneUserSnapshot = await getDocs(allJobOfOneUserQuery);

    let responseArr = [];
    allJobOfOneUserSnapshot.forEach((doc) => {
      const data = doc.data();
      const responseObject = {
        userId: data.userId,
        createdAt: data.createdAt,
        id: doc.id,
        jobTitle: data.jobTitle,
        description: data.description,
        qualifications: data.qualifications,
        companyName: data.companyName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        email: data.email,
        website: data.website,
        linkedIn: data.linkedIn,
      };
      responseArr.push(responseObject);
    });

    // if (responseArr.length === 0) {
    //   res.status(404).send('User have no jobs posted');
    // } else {
    //   res.send(responseArr);
    // }
    res.send(responseArr);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const data = req.body;
    const jobDocRef = doc(actualDb, 'jobs', jobId);
    const jobDoc = await getDoc(jobDocRef);

    if (!jobDoc.exists()) {
      res.status(404).send('Job not found');
    } else {
      await setDoc(jobDocRef, data, { merge: true });
      res.send('Job updated successfully');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const jobDocRef = doc(actualDb, 'jobs', jobId);
    const jobDoc = await getDoc(jobDocRef);

    if (!jobDoc.exists()) {
      res.status(404).send('Job not found');
    } else {
      await deleteDoc(jobDocRef);
      res.send('Job deleted successfully');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteAllJobOfOneUser = async (req, res) => {
  try {
    const { userId } = req.query;
    const allJobCollection = collection(actualDb, 'jobs');
    const allJobOfOneUserQuery = query(
      allJobCollection,
      where('userId', '==', `${userId}`)
    );
    const allJobOfOneUserSnapshot = await getDocs(allJobOfOneUserQuery);

    allJobOfOneUserSnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
    res.send('Jobs deleted successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  outputsML,
  addJob,
  getJobId,
  getAllJobOfOneUser,
  updateJob,
  deleteJob,
  deleteAllJobOfOneUser,
};
