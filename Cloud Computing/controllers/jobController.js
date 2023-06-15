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
  getDocs,
  deleteDoc,
  limit,
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

// to add dummy datas from a json file,
// problem at userId, the jobs will be unique but the user is only one guy
const addDummyJob = async (req, res) => {
  try {
    const currentDateTime = giveCurrentDateTime();
    const id = req.body.id;
    const data = {
      userId: req.body.userId,
      createdAt: req.body.createdAt,
      id: id,
      // job datas
      jobTitle: req.body.jobTitle,
      description: req.body.description,
      companyName: req.body.companyName,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      website: req.body.website,
      linkedIn: req.body.linkedIn,
      // ml request datas
      location: req.body.location,
      company_industry: req.body.company_industry,
      carrer_level: req.body.career_level,
      experience_level: req.body.experience_level,
      education_level: req.body.education_level,
      employment_type: req.body.employment_type,
      job_function: req.body.job_function,
    };

    // apply datas to db
    const jobDoc = doc(actualDb, 'jobs', id);
    await setDoc(jobDoc, { data, createdAt: currentDateTime });
    console.log(`${currentDateTime} with id: ${id} record saved`);
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
        // job datas
        jobTitle: data.jobTitle,
        description: data.description,
        companyName: data.companyName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        email: data.email,
        website: data.website,
        linkedIn: data.linkedIn,
        // ml datas
        location: data.location,
        company_industry: data.company_industry,
        carrer_level: data.career_level,
        experience_level: data.experience_level,
        education_level: data.education_level,
        employment_type: data.employment_type,
        job_function: data.job_function,
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
      where('userId', '==', userId),
      limit(100)
    );
    const allJobOfOneUserSnapshot = await getDocs(allJobOfOneUserQuery);

    let responseArr = [];
    allJobOfOneUserSnapshot.forEach((doc) => {
      const data = doc.data();
      const responseObject = {
        userId: data.userId,
        createdAt: data.createdAt,
        id: doc.id,
        // job datas
        jobTitle: data.jobTitle,
        description: data.description,
        companyName: data.companyName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        email: data.email,
        website: data.website,
        linkedIn: data.linkedIn,
        // ml datas
        location: data.location,
        company_industry: data.company_industry,
        carrer_level: data.career_level,
        experience_level: data.experience_level,
        education_level: data.education_level,
        employment_type: data.employment_type,
        job_function: data.job_function,
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
  addDummyJob,
  addJob,
  getJobId,
  getAllJobOfOneUser,
  updateJob,
  deleteJob,
  deleteAllJobOfOneUser,
};
