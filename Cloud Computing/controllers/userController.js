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
  deleteDoc,
  serverTimestamp,
} = require('firebase/firestore');
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

const addUser = async (req, res) => {
  try {
    const uuid = uuidv4();
    const currentDateTime = giveCurrentDateTime();
    const data = req.body;
    const userDoc = doc(actualDb, 'users', uuid);
    await setDoc(userDoc, { data, createdAt: currentDateTime });

    res.redirect(`/user/get-user-id/${uuid}`);
    console.log(`${currentDateTime} with id: ${uuid} record saved`);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const userIdDocRef = doc(actualDb, 'users', userId);
    const userData = await getDoc(userIdDocRef);

    if (!userData.exists()) {
      res.status(404).send('User not found');
    } else {
      const data = userData.data();
      const userWithId = {
        id: userId,
        createdAt: data.createdAt,
        userData: {
          firstName: data.data.firstName,
          lastName: data.data.lastName,
          age: data.data.age,
          description: data.data.description,
          profilePhoto: data.data.profilePhoto,
          username: data.data.username,
          password: data.data.password,
          cv: data.data.cv,
          skills: data.data.skills,
          address: data.data.address,
          phoneNumber: data.data.phoneNumber,
          email: data.data.email,
          // links could be empty array for later
          links: data.data.links,
        },
      };
      res.send(userWithId);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllUser = async (req, res) => {
  try {
    const allUserDoc = collection(actualDb, 'users');
    const allUserData = await getDocs(allUserDoc);

    let responseArr = [];
    allUserData.forEach((doc) => {
      const data = doc.data();
      const responseObject = {
        id: doc.id,
        createdAt: data.createdAt,
        userData: {
          firstName: data.data.firstName,
          lastName: data.data.lastName,
          age: data.data.age,
          description: data.data.description,
          profilePhoto: data.data.profilePhoto,
          username: data.data.username,
          password: data.data.password,
          cv: data.data.cv,
          skills: data.data.skills,
          address: data.data.address,
          phoneNumber: data.data.phoneNumber,
          email: data.data.email,
          // links could be empty array for later
          links: data.data.links,
        },
      };
      responseArr.push(responseObject);
    });
    res.send(responseArr);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userDocRef = doc(actualDb, 'users', userId);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      res.status(404).send('User not found');
    } else {
      await deleteDoc(userDocRef);
      res.send('User deleted successfully');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addUser,
  getUserId,
  getAllUser,
  deleteUser,
};
